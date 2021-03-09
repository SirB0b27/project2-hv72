from app import db

class Person(db.Model):
    userName = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    userScore = db.Column(db.Integer, nullable=False)
    
    
    def __repr__(self):
        return '<Person %r>' % self.username
        
