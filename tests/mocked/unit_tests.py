'''
python file to do some mocked unit test
'''
# pylint: disable=all
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import write_to_db, update_score
import models

KEY_INPUT = "input"
KEY_OUTPUT = "output"
INITIAL_USER = "hemanth"
class add_user_test(unittest.TestCase):
    
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "bobby",
                KEY_OUTPUT: [
                    models.Person(username=INITIAL_USER, userscore=200),
                    models.Person(username="bobby", userscore=100)
                ],
            },
            {
                KEY_INPUT: "jimmy",
                KEY_OUTPUT: [
                    models.Person(username=INITIAL_USER, userscore=200),
                    models.Person(username="bobby", userscore=100),
                    models.Person(username="jimmy", userscore=100)
                ],
            },
            {
                KEY_INPUT: "jason",
                KEY_OUTPUT: [
                    models.Person(username=INITIAL_USER, userscore=200),
                    models.Person(username="bobby", userscore=100),
                    models.Person(username="jimmy", userscore=100),
                    models.Person(username="jason", userscore=100)
                ],
            },
        ]
        
        initial_person = models.Person(username=INITIAL_USER, userscore=200)
        self.initial_db_mock = [initial_person]
        
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
        # print("i added ", self.initial_db_mock)
    
    def mocked_db_session_commit(self):
        # print("i am passing ", self.initial_db_mock)
        pass
    
    def mocked_person_query_all(self):
        # print("i am returning", self.initial_db_mock)
        return self.initial_db_mock
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all
                        
                        actual_result = write_to_db(test[KEY_INPUT])
                        # print("Actual Result: ", actual_result)
                        expected_result = test[KEY_OUTPUT]
                        # print("Expected Result: ", expected_result)
                        # print(actual_result[1].username)
                        # print(actual_result[1].userscore)
                        # print(expected_result[1].username)
                        # print(expected_result[1].userscore)
                    
                        self.assertEqual(len(actual_result), len(expected_result))
                        for i in range(len(actual_result)):
                            self.assertEqual(actual_result[i].username, expected_result[i].username)
                            self.assertEqual(actual_result[i].userscore, expected_result[i].userscore)
                        # print("\n")
    
class update_score_test(unittest.TestCase):
    
    def setUp(self):
        initial_person = models.Person(username=INITIAL_USER, userscore=200)
        self.initial_db_mock = [initial_person]
        self.initial_db_mock.append(models.Person(username="bob", userscore=110))
        self.initial_db_mock.append(models.Person(username="james", userscore=230))
        self.initial_db_mock.append(models.Person(username="billy", userscore=90))
        
        self.success_test_params = [
            {
                KEY_INPUT: ["bob", "billy"],
                KEY_OUTPUT: [
                    models.Person(username=INITIAL_USER, userscore=200),
                    models.Person(username="bob", userscore=111),
                    models.Person(username="james", userscore=230),
                    models.Person(username="billy", userscore=89)
                ],
            },
            {
                KEY_INPUT: ["billy", "james"],
                KEY_OUTPUT: [
                    models.Person(username=INITIAL_USER, userscore=200),
                    models.Person(username="bob", userscore=111),
                    models.Person(username="james", userscore=229),
                    models.Person(username="billy", userscore=90)
                ],
            },
            {
                KEY_INPUT: ["hemanth", "james", "bob"],
                KEY_OUTPUT: [
                    models.Person(username=INITIAL_USER, userscore=201),
                    models.Person(username="bob", userscore=111),
                    models.Person(username="james", userscore=228),
                    models.Person(username="billy", userscore=90)
                ],
            },
            
            
        ]
    def test(self):
        print("hello world")

if __name__ == "__main__":
    unittest.main()
    

# add_user_to_db as one of the unit tests
# update_winner as the second unit test

