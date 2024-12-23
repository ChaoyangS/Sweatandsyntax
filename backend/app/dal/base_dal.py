from app.db import get_db

class BaseDAL:
    """
    BaseDAL class that will be used in dao
    """
    def __init__(self):
        self.db = get_db()
        self.cursor = self.db.cursor()

    def execute_query(self, query, params=None):
        try:
            if params is None:
                params = ()
            self.cursor.execute(query, params)
        except Exception as e:
            self.db.rollback()
            print({"error": f"Unexpected error: {str(e)}"})

    def fetch_one(self):
        return self.cursor.fetchone()

    def fetch_all(self):
        return self.cursor.fetchall()

    def commit(self):
        self.db.commit()

    def close(self):
        self.cursor.close()