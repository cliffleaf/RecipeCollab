package personal.cliffleaf.recipecollab.recipe;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecipeRepository {

    @Autowired
    private DynamoDBMapper mapper;

    public Recipe save(Recipe recipe) {
        mapper.save(recipe);
        return recipe; // Return the updated recipe object with the generated ID
    }

    public Recipe findById(String id) {
        return mapper.load(Recipe.class, id);
    }

    public Recipe update(String id, Recipe newRecipe) {
        Recipe existingRecipe = mapper.load(Recipe.class, id);
        if (existingRecipe != null) {
            existingRecipe.setTitle(newRecipe.getTitle());
            existingRecipe.setAuthor(newRecipe.getAuthor());
            existingRecipe.setContent(newRecipe.getContent());
            existingRecipe.setImageUrl(newRecipe.getImageUrl());
            existingRecipe.setCategories(newRecipe.getCategories());

            mapper.save(existingRecipe);
            return existingRecipe;
        }
        return null;
    }

    public List<Recipe> getRecipesByCategory(String category) {
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        scanExpression.addFilterCondition("categories",
                new Condition()
                        .withComparisonOperator(ComparisonOperator.CONTAINS)
                        .withAttributeValueList(new AttributeValue().withS(category)));
        return mapper.scan(Recipe.class, scanExpression);
    }

    public List<Recipe> findAll() {
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        return mapper.scan(Recipe.class, scanExpression);
    }
}
