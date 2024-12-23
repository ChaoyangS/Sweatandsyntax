class UserDetails:
    """
    user_workout_goal.py represents a user_workout_goal object
    """

    def __init__(self, user_details_id, user_id, workout_goal, muscle, equipment):
        """
        Initiate a user instance
        :param user_details_id:  UserDetailsId from the database
        :param user_id: user id from the user.
        :param workout_goal: workout_goal of the user
        :param muscle: muscle focus of the user
        :param equipment: equipment preference of the user
        """

        self.user_details_id = user_details_id
        self.user_id = user_id
        self.workout_goal = workout_goal
        self.muscle = muscle
        self.equipment = equipment


    def user_dict(self):
        """
        Convert the user_workout_goal object to a dictionary
        :return: dictionary representation of the user_workout_goal
        """
        return {
            'user_details_id': self.user_details_id,
            'user_id': self.user_id,
            'weight': self.workout_goal,
            'height': self.muscle,
            'age' : self.equipment
        }