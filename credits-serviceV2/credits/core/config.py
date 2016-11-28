from paypal import PayPalConfig
from paypal import PayPalInterface

config=PayPalConfig(API_USERNAME = "tiagoferreiramagalhaes-facilitator-1_api1.ua.pt",
                      API_PASSWORD = "RL6KWS4XRR692GHV",
                      API_SIGNATURE = "AFcWxV21C7fd0v3bYYYRCpSSRl31An3hXXPDSXegqZgcS1X8yb2dDuRA",
                      DEBUG_LEVEL=0)
interface=PayPalInterface(config=config)