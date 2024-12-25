from ..dal.base_dal import BaseDAL  # Import BaseDAL for database interaction

class MealDAO(BaseDAL):
    """
    Data Access Object (DAO) for handling database queries related to meal plans.
    """

    # -------------------------------
    # Method 1: Create Meal Plan
    # -------------------------------
    def create_user_meal_plan(self, user_id):
        """
        Finds a meal plan that matches the user's preferences (goal, level, etc.).
        :param user_id: ID of the user for whom the meal plan is generated.
        :return: Dictionary containing the meal plan data.
        """
        # SQL query to find a matching meal plan based on user preferences
        self.execute_query(
            """
            SELECT mp.*
            FROM user_details ud
            JOIN meal_plan mp
            ON ud.level = mp.goal
            WHERE ud.user_id=?;
            """,
            (user_id,)
        )
        return self.fetch_one()  # Fetch the first matching plan


    # -------------------------------
    # Method 2: Update Meal Plan for User
    # -------------------------------
    def update_meal_plan_for_user(self, user_id, meal_plan_id):
        """
        Updates the user's record to link them to the assigned meal plan.
        :param user_id: ID of the user.
        :param meal_plan_id: ID of the assigned meal plan.
        """
        self.execute_query(
            """
            UPDATE user_details
            SET meal_plan_id = ?
            WHERE user_id = ?;
            """,
            (meal_plan_id, user_id)
        )
        self.commit()  # Commit the update


    # -------------------------------
    # Method 3: Get Meal Plan
    # -------------------------------
    def get_meal_plan(self, meal_plan_id):
        """
        Retrieves a meal plan by its ID.
        :param meal_plan_id: ID of the meal plan to fetch.
        :return: Dictionary containing meal plan details.
        """
        self.execute_query(
            """
            SELECT * FROM meal_plan WHERE meal_plan_id = ?;
            """,
            (meal_plan_id,)
        )
        return self.fetch_one()


    # -------------------------------
    # Method 4: Get Meal Plan Details
    # -------------------------------
    def get_meal_plan_details(self, meal_plan_id):
        """
        Retrieves detailed meal information for a given meal plan.
        :param meal_plan_id: ID of the meal plan whose details are to be fetched.
        :return: List of dictionaries containing meal details.
        """
        self.execute_query(
            """
            SELECT * FROM meal_plan_details WHERE meal_plan_id = ?;
            """,
            (meal_plan_id,)
        )
        return self.fetch_all()  # Fetch all matching rows
