from src.db.app import DbApp


def main() -> None:
    db = DbApp()
    db.init_db()


if __name__ == '__main__':
    main()
