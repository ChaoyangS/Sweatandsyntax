class UserExerciseProgress:
    """
    user_exercise_progress.py represents a UserExerciseProgress object
    """
    def __init__(self, progress_id, user_id, weight, date_logged=None, notes=None):
        """

        :param progress_id: progress_id from the database
        :param user_id: user_id from the user
        :param weight: weight from the user input
        :param date_logged: date of the notes logged
        :param notes: notes from the user input
        """
        self.progress_id = progress_id
        self.user_id = user_id
        self.weight = weight
        self.date_logged = date_logged
        self.notes = notes

    def to_dict(self):
        return {
            "progress_id": self.progress_id,
            "user_id": self.user_id,
            "weight": self.weight,
            "date_logged": self.date_logged,
            "notes": self.notes,
        }