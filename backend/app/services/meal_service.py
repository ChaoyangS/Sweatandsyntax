from ..dal.meal_dao import MealDAO  # Import DAO for database interactions
from ..models.meal_plan import MealPlan  # Import MealPlan model
from ..models.meal_plan_details import MealPlanDetails  # Import MealPlanDetails model

class MealService:
    """
    Service layer for handling meal plan business logic.
    """

    # -------------------------------
    # Method 1: Create Meal Plan
    # -------------------------------
    @staticmethod
    def create_user_meal_plan(user_id):
        """
        Generates a meal plan for the given user based on their preferences.
        :param user_id: ID of the user for whom the meal plan is generated.
        :return: JSON response with success or error message.
        """
        # Create DAO instance for database operations
        meal_dao = MealDAO()

        # Fetch a meal plan based on user preferences
        meal_plan = meal_dao.create_user_meal_plan(user_id)

        # If a matching meal plan is found, assign it to the user
        if meal_plan:
            meal_dao.update_meal_plan_for_user(user_id, meal_plan["meal_plan_id"])
            return {"success": "Meal plan successfully generated for user", "user_id": user_id}, 201

        # Return error if no plan is found
        return {"error": "No meal plan found for user"}, 404


    # -------------------------------
    # Method 2: Get Meal Plan
    # -------------------------------
    @staticmethod
    def get_meal_plan(meal_plan_id):
        """
        Retrieves the meal plan associated with the given ID.
        :param meal_plan_id: ID of the meal plan to fetch.
        :return: JSON response with meal plan data or error message.
        """
        # Create DAO instance
        meal_dao = MealDAO()

        # Fetch meal plan by ID
        meal_plan = meal_dao.get_meal_plan(meal_plan_id)

        # Return the plan if found
        if meal_plan:
            return {"meal_plan": MealPlan(**meal_plan).to_dict()}, 200

        # Return error if no plan is found
        return {"error": "No meal plan found"}, 404


    # -------------------------------
    # Method 3: Get Meal Plan Details
    # -------------------------------
    @staticmethod
    def get_meal_plan_details(meal_plan_id):
        """
        Retrieves detailed meal information for the given meal plan ID.
        :param meal_plan_id: ID of the meal plan whose details are to be fetched.
        :return: JSON response with detailed meal information or error message.
        """
        # Create DAO instance
        meal_dao = MealDAO()

        # Fetch meal plan details
        details = meal_dao.get_meal_plan_details(meal_plan_id)

        # Return details if found
        if details:
            meal_list = [MealPlanDetails(**detail).to_dict() for detail in details]
            return {"meal_plan_details": meal_list}, 200

        # Return error if no details are found
        return {"error": "No meal plan details found"}, 404
