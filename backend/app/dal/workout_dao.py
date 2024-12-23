from .base_dal import BaseDAL

class WorkoutDAO(BaseDAL):
    """
    Data Access Layer for workout-related operations.
    Handles all database interactions related to the 'workout' and 'workout-details' table.
    """

    def create_user_workout_plan(self, user_id):
        self.execute_query(
            """SELECT ud.user_id, wp.workout_plan_id, wp.workout_name, wp.days, wp.goal, wp.muscle, wp.equipment, wp.level
                        FROM user_details ud
                        JOIN user_workout_goal uwg ON ud.user_id = uwg.user_id
                        JOIN workout_plan wp ON ud.level = wp.level AND
                                                uwg.workout_goal = wp.goal AND
                                                uwg.muscle = wp.muscle AND uwg.equipment = wp.equipment
                        WHERE ud.user_id=?;
                        """,
            user_id
        )
        return self.fetch_one()

    def update_workout_plan_in_user_workout_goal(self, user_id, workout_id):
        self.execute_query(
            """UPDATE user_workout_goal
            SET workout_plan_id = ?
            WHERE user_id = ?;""",
            (workout_id, user_id)
        )
        self.commit()

    def get_workout_plan(self, workout_plan_id):
        self.execute_query(
            """SELECT * FROM workout_plan WHERE workout_plan_id = ?;""",
            (workout_plan_id,)
        )
        return self.fetch_one()

    def get_workout_plan_details(self, workout_plan_id):
        self.execute_query(
            """SELECT * FROM workout_plan_details WHERE workout_plan_id = ?;""",
            (workout_plan_id,)
        )
        return self.fetch_all()