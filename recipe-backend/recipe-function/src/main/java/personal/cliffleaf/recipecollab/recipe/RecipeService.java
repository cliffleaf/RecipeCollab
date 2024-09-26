package personal.cliffleaf.recipecollab.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe saveRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
        return recipe;
    }

    public Recipe getRecipeById(String id) {
        return recipeRepository.findById(id);
    }

    public Recipe updateRecipe(String id, Recipe newRecipe) {
        return recipeRepository.update(id, newRecipe);
    }

    public List<Recipe> getRecipesByCategory(String category) {
        return recipeRepository.getRecipesByCategory(category);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
}

