class User:
    """
    User.py represents a user object
    """

    def __init__(self, user_id, username, password, email):
        """
        Initiate a user instance
        :param id:  UserId from the database
        :param username: Username of the user.
        :param password: Password of the user
        :param email: Email of the user
        """

        self.user_id = user_id
        self.username = username
        self.password = password
        self.email = email


    def user_dict(self):
        """
        Convert the user object to a dictionary
        :return: dictionary representation of the user
        """
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
        }