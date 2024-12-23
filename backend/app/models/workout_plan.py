class WorkoutPlan:
    """
    workout_plan.py represents a Workout_Plan object
    """

    def __init__(self, workout_plan_id, workout_name, days, goal, muscle, equipment, level):
        """
        Initiate a user instance
        :param workout_plan_id:  UserDetailsId from the database
        :param workout_name: user id from the user.
        :param days: weight of the user
        :param goal: height of the user
        :param muscle: age of the user
        :param equipment: gender of the age
        :param level: muscle focus of the user
        :param time_required: activity_level of the user
        :param calories_burned: activity_level of the user
        """

        self.workout_plan_id = workout_plan_id
        self.workout_name = workout_name
        self.days = days
        self.goal = goal
        self.muscle = muscle
        self.equipment = equipment
        self.level = level


    def to_dict(self):
        """
        Convert the user_details object to a dictionary
        :return: dictionary representation of the workout
        """
        return {
            "workout_plan_id": self.workout_plan_id,
            "workout_name": self.workout_name,
            "days": self.days,
            "goal": self.goal,
            "muscle": self.muscle,
            "equipment": self.equipment,
            "level": self.level
        }