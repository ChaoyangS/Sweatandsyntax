class MealPlanDetails:
    """
     meal_plan_details.py represents a MealPlanDetails object
    """
    def __init__(self, meal_plan_detail_id, meal_plan_id, meal_type, meal_name, prep_time, ingredients, protein, carbs, fats, calories):
        """
        :param meal_plan_detail_id: id from the table
        :param meal_plan_id: id from meal plan
        :param meal_type: type of the meal
        :param meal_name: name of the meal
        :param prep_time: total prep time of the meal
        :param ingredients: ingredients of the meal
        :param protein: protein of the meal
        :param carbs: carbs of the meal
        :param fats: fats of the meal
        :param calories: calories of the meal
        """
        self.meal_plan_detail_id = meal_plan_detail_id
        self.meal_plan_id = meal_plan_id
        self.meal_type = meal_type
        self.meal_name = meal_name
        self.prep_time = prep_time
        self.ingredients = ingredients
        self.protein = protein
        self.carbs = carbs
        self.fats = fats
        self.calories = calories

    def to_dict(self):
        """
        Convert the meal plan detail object to a dictionary
        :return: dictionary representation of the meal plan detail
        """
        return {
            "meal_plan_detail_id": self.meal_plan_detail_id,
            "meal_plan_id": self.meal_plan_id,
            "meal_type": self.meal_type,
            "meal_name": self.meal_name,
            "prep_time": self.prep_time,
            "ingredients": self.ingredients,
            "protein": self.protein,
            "carbs": self.carbs,
            "fats": self.fats,
            "calories": self.calories,
        }
