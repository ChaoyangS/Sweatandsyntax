from .base_dal import BaseDAL

class UserDAO(BaseDAL):
    """
    Data Access Layer for user-related operations.
    Handles all database interactions related to the 'user' and 'user-details' table.
    """
    def get_user_by_username_or_email(self, username, email):
        self.execute_query(
            "SELECT * FROM user WHERE username = ? OR email = ?",
            (username, email)
        )
        return self.fetch_one()

    def create_user(self, username, hashed_password, email):
        self.execute_query(
            "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
            (username, hashed_password, email)
        )
        user_id = self.cursor.lastrowid
        self.commit()
        return user_id

    def create_user_details(self, user_id, weight, height, age, gender, activity_level):
        self.execute_query(
            """INSERT INTO user_details (user_id, weight, height, age, gender, , activity_level) 
            VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (user_id, weight, height, age, gender, activity_level)
        )
        self.commit()

    def create_user_workout_goal(self, user_id, workout_goal, muscle, equipment):
        self.execute_query(
            """INSERT INTO user_details (user_id, workout_goal, muscle, equipment) 
            VALUES (?, ?, ?, ?)""",
            (user_id, workout_goal, muscle, equipment)
        )
        self.commit()

    def get_user_by_username(self, username):
        self.execute_query(
            "SELECT * FROM user WHERE username = ?",
            (username,)
        )
        return self.fetch_one()

    def get_user_by_id(self, user_id):
        self.execute_query(
            "SELECT * FROM user WHERE user_id = ?",
            (user_id,)
        )
        return self.fetch_one()

    def update_user_password(self, user_id, new_password):
        self.execute_query(
            "UPDATE user SET password = ? WHERE user_id = ?",
            (new_password, user_id)
        )
        self.commit()

    def update_user_details(self, user_id, **kwargs):
        updates = []
        values = []

        for key, value in kwargs.items():
            if value is not None:
                updates.append(f"{key} = ?")
                values.append(value)

        if updates:
            sql = f"UPDATE user_details SET {', '.join(updates)} WHERE user_id = ?"
            values.append(user_id)
            self.execute_query(sql, values)
            self.commit()