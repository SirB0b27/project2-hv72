'''
python test file to do 2 unmocked unit tests

for some reason I was not able to call self in another function,
so I decided to do testcases per function
'''
# pylint: disable=all
import unittest
import sys
import os

sys.path.append(os.path.abspath('../../'))
from app import add_to_dict, reset_counter


class users:
    def __init__(self, name, score):
        self.username = name
        self.userscore = score


class add_to_dict_test(unittest.TestCase):
    def test_case_one(self):
        user1 = users("Bob", 100)
        result_dict = add_to_dict([user1])
        result_keys = list(result_dict.keys())

        expected_result = {"Bob": 100}
        expected_keys = list(expected_result.keys())

        self.assertEqual(len(result_dict), len(expected_result))
        self.assertEqual(result_dict[result_keys[0]],
                         expected_result[expected_keys[0]])

    def test_case_two(self):
        user1 = users("James", 120)
        user2 = users("Kevin", 150)
        user3 = users("Chris", 115)
        result_dict = add_to_dict([user1, user2, user3])
        result_keys = list(result_dict.keys())
        # print(result_dict)

        expected_result = {"James": 120, "Kevin": 150, "Chris": 115}
        expected_keys = list(expected_result.keys())
        # print(expected_result)

        self.assertEqual(len(result_dict), len(expected_result))
        self.assertEqual(result_dict[result_keys[0]],
                         expected_result[expected_keys[0]])
        self.assertEqual(result_dict[result_keys[1]],
                         expected_result[expected_keys[1]])
        self.assertEqual(result_dict[result_keys[2]],
                         expected_result[expected_keys[2]])

    def test_case_three(self):
        user1 = users("Liam", 120)
        user2 = users("Noah", 150)
        user3 = users("William", 115)
        user4 = users("James", 250)
        user5 = users("Lucas", 415)
        result_dict = add_to_dict([user1, user2, user3, user4, user5])
        result_keys = list(result_dict.keys())

        expected_result = {
            "Liam": 120,
            "Noah": 150,
            "William": 115,
            "James": 250,
            "Lucas": 415
        }
        expected_keys = list(expected_result.keys())

        self.assertEqual(len(result_dict), len(expected_result))
        self.assertEqual(result_dict[result_keys[0]],
                         expected_result[expected_keys[0]])
        self.assertEqual(result_dict[result_keys[1]],
                         expected_result[expected_keys[1]])
        self.assertEqual(result_dict[result_keys[2]],
                         expected_result[expected_keys[2]])
        self.assertEqual(result_dict[result_keys[3]],
                         expected_result[expected_keys[3]])
        self.assertEqual(result_dict[result_keys[4]],
                         expected_result[expected_keys[4]])


class reset_counter_test(unittest.TestCase):
    def test_case_one(self):
        return_count = reset_counter(
            {"arr": ['', '', '', '', '', '', '', '', '']}, 10)
        # print(return_count)

        expected_result = [0, ['', '', '', '', '', '', '', '', '']]

        self.assertEqual(len(return_count), len(expected_result))
        self.assertEqual(return_count[0], expected_result[0])
        self.assertEqual(len(return_count[1]), len(expected_result[1]))
        self.assertEqual(return_count[1], expected_result[1])

    def test_case_two(self):
        return_count = reset_counter(
            {"arr": ['X', '', '', '', 'X', '', '', 'O', '']}, 20)
        # print(return_count)

        expected_result = [20, ['X', '', '', '', 'X', '', '', 'O', '']]

        self.assertEqual(len(return_count), len(expected_result))
        self.assertEqual(return_count[0], expected_result[0])
        self.assertEqual(len(return_count[1]), len(expected_result[1]))
        self.assertEqual(return_count[1], expected_result[1])

    def test_case_three(self):
        return_count = reset_counter(
            {"arr": ['X', 'X', 'O', 'X', 'O', '', '', '', '']}, 30)
        # print(return_count)

        expected_result = [30, ['X', 'X', 'O', 'X', 'O', '', '', '', '']]

        self.assertEqual(len(return_count), len(expected_result))
        self.assertEqual(return_count[0], expected_result[0])
        self.assertEqual(len(return_count[1]), len(expected_result[1]))
        self.assertEqual(return_count[1], expected_result[1])


if __name__ == "__main__":
    unittest.main()
