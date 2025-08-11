import json
import os
import re
from typing import Any, Dict, Optional

import boto3
from botocore.exceptions import ClientError

# ---- config ----
DDB = boto3.resource("dynamodb")
TABLE = DDB.Table(os.environ.get("TABLE_NAME", "Recipes"))

ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")
CORS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
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

def _path_id(event) -> Optional[str]:
    p = event.get("pathParameters") or {}
    if "id" in p:
        return p["id"]
    raw_path = (event.get("requestContext", {}).get("http", {}) or {}).get("path") or event.get("path") or ""
    m = re.fullmatch(r"/api/docs/([^/]+)", raw_path.rstrip("/"))
    return m.group(1) if m else None

# ---- data ops ----
def get_doc(doc_id: str) -> Optional[Dict[str, Any]]:
    resp = TABLE.get_item(Key={"id": doc_id})
    item = resp.get("Item")
    if not item:
        return None
    return {"id": item["id"], "title": item.get("title", "Untitled"), "content": item.get("content", "")}

def update_doc(doc_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    names, vals, sets = {}, {}, []

    if "title" in payload and payload["title"] is not None:
        names["#t"], vals[":t"] = "title", str(payload["title"])
        sets.append("#t = :t")
    if "content" in payload and payload["content"] is not None:
        names["#c"], vals[":c"] = "content", str(payload["content"])
        sets.append("#c = :c")

    if not sets:
        raise ValueError("Nothing to update")

    try:
        TABLE.update_item(
            Key={"id": doc_id},
            UpdateExpression="SET " + ", ".join(sets),
            ExpressionAttributeNames=names,
            ExpressionAttributeValues=vals,
            ConditionExpression="attribute_exists(id)",
        )
    except ClientError as e:
        if e.response["Error"]["Code"] == "ConditionalCheckFailedException":
            return {"error": "Not found", "status": 404}
        raise
    return {"ok": True}

# ---- handler for GET /api/docs/{id}, PUT /api/docs/{id}
def handler(event, context):
    method = (event.get("requestContext", {}).get("http", {}) or {}).get("method") or event.get("httpMethod")
    if method == "OPTIONS":
        return {"statusCode": 204, "headers": CORS, "body": ""}

    doc_id = _path_id(event)
    if not doc_id:
        return make_resp(404, {"error": "Not found"})

    if method == "GET":
        doc = get_doc(doc_id)
        return make_resp(200, doc) if doc else make_resp(404, {"error": "Not found"})

    if method == "PUT":
        body = parse_json(event.get("body"))
        if not isinstance(body, dict):
            return make_resp(400, {"error": "Bad request"})
        try:
            result = update_doc(doc_id, body)
            if "error" in result:
                return make_resp(result["status"], {"error": result["error"]})
            return make_resp(200, result)
        except ValueError:
            return make_resp(400, {"error": "Bad request"})
        except ClientError:
            return make_resp(500, {"error": "Internal error"})

    return make_resp(405, {"error": "Method not allowed"})
