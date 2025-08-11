import json
import os
import re
import secrets
from typing import Any, Dict, List, Optional

import boto3
from botocore.exceptions import ClientError

# ---- config ----
DDB = boto3.resource("dynamodb")
TABLE = DDB.Table(os.environ.get("TABLE_NAME", "Recipes"))

ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")
CORS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
}

# ---- utils ----
def make_resp(status: int, body: Any = None, extra_headers: Optional[Dict[str, str]] = None):
    headers = {"Content-Type": "application/json", **CORS}
    if extra_headers: headers.update(extra_headers)
    return {"statusCode": status, "headers": headers, "body": "" if body is None else json.dumps(body)}

def parse_json(body: Optional[str]) -> Dict[str, Any]:
    if not body: return {}
    try: return json.loads(body)
    except json.JSONDecodeError: return {}

def rid() -> str:
    return "r_" + secrets.token_urlsafe(8)

def title_from_content(content: str) -> str:
    for line in content.splitlines():
        s = line.strip()
        if not s: 
            continue
        s = re.sub(r"^#{1,6}\s*", "", s)
        return s[:120] if s else "Untitled"
    return "Untitled"

# ---- data ops ----
def list_docs() -> List[Dict[str, Any]]:
    resp = TABLE.scan(
        ProjectionExpression="id, #t",
        ExpressionAttributeNames={"#t": "title"},
    )
    items = resp.get("Items", [])
    return [{"id": it["id"], "title": it.get("title", "Untitled")} for it in items]

def create_doc(payload: Dict[str, Any]) -> Dict[str, Any]:
    content = payload.get("content", "")
    title = payload.get("title") or (title_from_content(content) if content else "Untitled")
    _id = rid()
    TABLE.put_item(
        Item={"id": _id, "title": str(title), "content": str(content)},
        ConditionExpression="attribute_not_exists(id)",
    )
    return {"id": _id, "title": title}

# ---- handler ---- for GET /api/docs, POST /api/docs
def handler(event, context):
    method = (event.get("requestContext", {}).get("http", {}) or {}).get("method") or event.get("httpMethod")
    if method == "OPTIONS":
        return {"statusCode": 204, "headers": CORS, "body": ""}

    if method == "GET":
        return make_resp(200, list_docs())

    if method == "POST":
        body = parse_json(event.get("body"))
        if not isinstance(body, dict):
            return make_resp(400, {"error": "Bad request"})
        try:
            created = create_doc(body)
            return make_resp(201, created)
        except ClientError:
            return make_resp(500, {"error": "Internal error"})

    return make_resp(405, {"error": "Method not allowed"})
