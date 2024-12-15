class MealPlan:
    """
    meal_plan.py represents a MealPlan object
    """
    def __init__(self, meal_plan_id, meal_plan_name, goal):
        """
        :param meal_plan_id: meail_plan id form the database
        :param meal_plan_name: meal plan name
        :param goal: meail plan goal
        """
        self.meal_plan_id = meal_plan_id
        self.meal_plan_name = meal_plan_name
        self.goal = goal

    def to_dict(self):
        """
        Convert the meal plan object to a dictionary
        :return: dictionary representation of the mealplan
        """
        return {
            "meal_plan_id": self.meal_plan_id,
            "meal_plan_name": self.meal_plan_name,
            "goal": self.goal,
        }