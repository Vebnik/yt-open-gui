from sqlalchemy import Table, Column, Integer, String
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    ...


class Subscriber(Base):
    __tablename__ = 'subs'

    id = Column(Integer, primary_key=True, index=True)
    chanel_id = Column(String)
    title = Column(String)
    channel_follower_count = Column(Integer)
    description = Column(String)
    videos = Column(Integer)
    avatar = Column(String)

    def to_dict(self):
        return {
            'id': self.id,
            'chanel_id': self.chanel_id,
            'title': self.title,
            'channel_follower_count': self.channel_follower_count,
            'description': self.description,
            'videos': self.videos,
            'avatar': self.avatar,
        }
