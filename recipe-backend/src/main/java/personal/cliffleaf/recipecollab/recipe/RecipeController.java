package personal.cliffleaf.recipecollab.recipe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/upload")
    public Recipe uploadRecipe(@RequestBody Recipe recipe) {
        return recipeService.saveRecipe(recipe);
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable String id) {
        return recipeService.getRecipeById(id);
    }

    @PutMapping("/edit/{id}")
    public Recipe editRecipe(@PathVariable String id, @RequestBody Recipe newRecipe) {
        return null;
    }

    @GetMapping
    public List<Recipe> getRecipesByCategory(@RequestParam String category) {
        return null;
    }

}
