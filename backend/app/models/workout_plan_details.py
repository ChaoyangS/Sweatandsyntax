class WorkoutPlanDetails:
    """
    workout_plan_details.py represents a workout_plan_details object
    """
    def __init__(self, workout_plan_detail_id, workout_plan_id, day_of_week, exercise_name, sets, reps, interval, rest_time):
        """

        :param workout_plan_detail_id: id from the database
        :param workout_plan_id: workout_plan_id from workout_plan
        :param day_of_week: day of the week
        :param exercise_name: name of the workout
        :param sets: sets of the workout
        :param reps: reps of the workout
        :param interval: interval of the workout
        :param rest_time: rest_time of the workout
        """
        self.workout_plan_detail_id = workout_plan_detail_id
        self.workout_plan_id = workout_plan_id
        self.day_of_week = day_of_week
        self.exercise_name = exercise_name
        self.sets = sets
        self.reps = reps
        self.interval = interval
        self.rest_time = rest_time

    def to_dict(self):
        """
        Convert the user_details object to a dictionary
        :return: dictionary representation of the workout_plan_details
        """
        return {
            "workout_plan_detail_id": self.workout_plan_detail_id,
            "workout_plan_id": self.workout_plan_id,
            "day_of_week": self.day_of_week,
            "exercise_name": self.exercise_name,
            "sets": self.sets,
            "reps": self.reps,
            "interval": self.interval,
            "rest_time": self.rest_time,
        }
