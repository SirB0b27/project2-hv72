'''
this file is for creating a database table model
'''
# pylint: disable=E1101, C0413, W1508, R0903, W0603

from app import DB


class Person(DB.Model):
    '''
    This class is for the table person with columns:
    - username as unique primary key
    - userscore as an integer
    '''
    # id = db.Column(db.Integer, primary_key=True)
    username = DB.Column(DB.String(80),
                         unique=True,
                         nullable=False,
                         primary_key=True)
    # email = db.Column(db.String(120), unique=True, nullable=False)
    userscore = DB.Column(DB.Integer, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
