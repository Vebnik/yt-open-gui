import logging
from typing import Any

from sqlalchemy import create_engine, Engine, MetaData
from sqlalchemy.orm import Session

from src.db.models import Base, Subscriber


class DbApp:
    engine: Engine
    metadata_obj: MetaData
    session: Session

    def __init__(self):
        try:
            logging.info('Init db ...')

            self.engine = create_engine("sqlite+pysqlite:///db.sqlite3", echo=True)
            self.metadata_obj = MetaData()
            self.session = Session(bind=self.engine, autoflush=True)

        except Exception as ex:
            logging.critical(ex)

    def create_subs(self, data: dict) -> None:

        new_subs = Subscriber(
            title=data.get('title'),
            channel_follower_count=data.get('channel_follower_count'),
            description=data.get('description'),
            videos=data.get('videos'),
            avatar=data.get('avatar'),
            chanel_id=data.get('id'),
        )

        self.session.add(new_subs)
        self.session.commit()
        self.session.refresh(new_subs)

    def get_subs(self) -> list[Any]:
        subs = self.session.query(Subscriber).all()

        print('Insert subs')

        return [item.to_dict() for item in subs]

    def remove_subs(self, channel_id):
        sub = self.session.query(Subscriber).filter(Subscriber.chanel_id==channel_id).first()

        self.session.delete(sub)
        self.session.commit()


    def init_db(self) -> None:
        logging.info('Init db ...')

        Base.metadata.create_all(bind=self.engine)
        self.session.close()
