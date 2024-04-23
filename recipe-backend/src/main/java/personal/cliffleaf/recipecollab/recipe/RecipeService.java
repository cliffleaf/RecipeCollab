package personal.cliffleaf.recipecollab.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

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

    // Implement more business logic as needed, such as update, delete, etc.
}

