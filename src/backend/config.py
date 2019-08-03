from configobj import ConfigObj


class Config(object):
    def __init__(self, develop: bool = True, paste_key: str = 'ctrl+l'):
        self.develop = develop
        self.paste_key = paste_key

    @staticmethod
    def to_config(config_obj: ConfigObj):
        return Config(
            develop=config_obj.get('DEFAULT').as_bool('development'),
            paste_key=config_obj.get('DEFAULT').get('PasteActionKey')
        )

    def __str__(self):
        return (
            f'current settings: \n'
            f'\tdevelopment: \t{self.develop}\n'
            f'\taction key: \t{self.paste_key}'
        )


CONFIG_PATH = 'config/default.ini'
print(f'loading config from path: {CONFIG_PATH}')
CONFIG_OBJ: ConfigObj = ConfigObj(CONFIG_PATH)
DEFAULT_CONFIG = Config.to_config(CONFIG_OBJ)
print(DEFAULT_CONFIG)
