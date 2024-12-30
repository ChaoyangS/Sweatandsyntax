class UserDetails:
    """
    user_details.py represents a user_details object
    """

    def __init__(self, user_details_id, user_id, weight, height, age, gender, muscle, activity_level):
        """
        Initiate a user instance
        :param user_details_id:  UserDetailsId from the database
        :param user_id: user id from the user.
        :param weight: weight of the user
        :param height: height of the user
        :param age: age of the user
        :param gender: gender of the age
        :param muscle: muscle focus of the user
        :param activity_level: activity_level of the user
        """

        self.user_details_id = user_details_id
        self.user_id = user_id
        self.weight = weight
        self.height = height
        self.age = age
        self.gender = gender
        self.activity_level = activity_level


    def user_dict(self):
        """
        Convert the user_details object to a dictionary
        :return: dictionary representation of the user_details
        """
        return {
            'user_details_id': self.user_details_id,
            'user_id': self.user_id,
            'weight': self.weight,
            'height': self.height,
            'age' : self.age,
            'gender': self.gender,
            'activity_level' : self.activity_level
        }
    
    