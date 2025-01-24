const whoisServers = {
  "ac": "whois.nic.ac",
  "ae": "whois.aeda.net.ae",
  "aero": "whois.aero",
  "af": "whois.nic.af",
  "ag": "whois.nic.ag",
  "ai": "whois.ai",
  "al": "whois.ripe.net",
  "am": "whois.amnic.net",
  "arpa": "whois.iana.org",
  "asia": "whois.nic.asia",
  "at": "whois.nic.at",
  "au": "whois.auda.org.au",
  "aw": "whois.nic.aw",
  "ax": "whois.ax",
  "az": "whois.ripe.net",
  "ba": "whois.ripe.net",
  "be": "whois.dns.be",
  "bg": "whois.register.bg",
  "bi": "whois1.nic.bi",
  "biz": "whois.nic.biz",
  "bj": "whois.nic.bj",
  "bo": "whois.nic.bo",
  "br": "whois.registro.br",
  "bt": "whois.netnames.net",
  "by": "whois.cctld.by",
  "bz": "whois.belizenic.bz",
  "ca": "whois.cira.ca",
  "cat": "whois.cat",
  "cc": "whois.nic.cc",
  "cd": "whois.nic.cd",
  "cf": "whois.dot.cf",
  "ch": "whois.nic.ch",
  "ci": "whois.nic.ci",
  "ck": "whois.nic.ck",
  "cl": "whois.nic.cl",
  "cloud": "whois.nic.cloud",
  "cm": "whois.netcom.cm",
  "cn": "whois.cnnic.cn",
  "co": "whois.nic.co",
  "com": "whois.verisign-grs.com",
  "coop": "whois.nic.coop",
  "cr": "whois.nic.cr",
  "cu": "whois.nic.cu",
  "cv": "whois.dns.cv",
  "cw": "whois.una.cw",
  "cx": "whois.nic.cx",
  "cz": "whois.nic.cz",
  "de": "whois.denic.de",
  "dk": "whois.dk-hostmaster.dk",
  "dm": "whois.nic.dm",
  "dz": "whois.nic.dz",
  "ec": "whois.nic.ec",
  "edu": "whois.educause.edu",
  "ee": "whois.eenet.ee",
  "eg": "whois.ripe.net",
  "es": "whois.nic.es",
  "eu": "whois.eu",
  "fi": "whois.fi",
  "fj": "whois.usp.ac.fj",
  "fm": "whois.nic.fm",
  "fo": "whois.nic.fo",
  "fr": "whois.nic.fr",
  "ga": "whois.my.ga",
  "gd": "whois.nic.gd",
  "ge": "whois.nic.ge",
  "gg": "whois.gg",
  "gi": "whois2.afilias-grs.net",
  "gl": "whois.nic.gl",
  "gm": "whois.nic.gm",
  "gov": "whois.dotgov.gov",
  "gr": "whois.ics.forth.gr",
  "gs": "whois.nic.gs",
  "gy": "whois.registry.gy",
  "hk": "whois.hkirc.hk",
  "hn": "whois.nic.hn",
  "hr": "whois.dns.hr",
  "ht": "whois.nic.ht",
  "hu": "whois.nic.hu",
  "id": "whois.pandi.or.id",
  "ie": "whois.domainregistry.ie",
  "il": "whois.isoc.org.il",
  "im": "whois.nic.im",
  "in": "whois.registry.in",
  "io": "whois.nic.io",
  "iq": "whois.cmc.iq",
  "ir": "whois.nic.ir",
  "is": "whois.isnic.is",
  "it": "whois.nic.it",
  "je": "whois.je",
  "jm": "whois.uwimona.edu.jm",
  "jo": "whois.joregistry.com",
  "jobs": "whois.nic.jobs",
  "jp": "whois.jprs.jp",
  "ke": "whois.kenic.or.ke",
  "kg": "www.domain.kg",
  "ki": "whois.nic.ki",
  "kr": "whois.kr",
  "kw": "whois.kw",
  "ky": "whois.kyregistry.ky",
  "kz": "whois.nic.kz",
  "la": "whois.nic.la",
  "lb": "whois.lbdr.org.lb",
  "lc": "whois2.afilias-grs.net",
  "li": "whois.nic.li",
  "lk": "whois.nic.lk",
  "lt": "whois.domreg.lt",
  "lu": "whois.dns.lu",
  "lv": "whois.nic.lv",
  "ly": "whois.nic.ly",
  "ma": "whois.registre.ma",
  "mc": "whois.ripe.net",
  "md": "whois.nic.md",
  "me": "whois.nic.me",
  "mg": "whois.nic.mg",
  "mil": "whois.nic.mil",
  "mk": "whois.marnet.mk",
  "ml": "whois.dot.ml",
  "mm": "whois.nic.mm",
  "mn": "whois.nic.mn",
  "mo": "whois.monic.mo",
  "mobi": "whois.dotmobiregistry.net",
  "mp": "whois.nic.mp",
  "ms": "whois.nic.ms",
  "mu": "whois.nic.mu",
  "museum": "whois.museum",
  "mx": "whois.mx",
  "my": "whois.mynic.my",
  "mz": "whois.nic.mz",
  "na": "whois.na-nic.com.na",
  "name": "whois.nic.name",
  "nc": "whois.nc",
  "ne": "whois.nic.ne",
  "nf": "whois.nic.nf",
  "ng": "whois.nic.net.ng",
  "ni": "whois.nic.ni",
  "nl": "whois.domain-registry.nl",
  "no": "whois.norid.no",
  "np": "whois.mos.com.np",
  "nr": "whois.cenpac.net.nr",
  "nu": "whois.nic.nu",
  "nz": "whois.srs.net.nz",
  "om": "whois.registry.om",
  "org": "whois.pir.org",
  "pa": "whois.nic.pa",
  "pe": "kero.yachay.pe",
  "pf": "whois.registry.pf",
  "pg": "whois.nic.pg",
  "ph": "whois.dot.ph",
  "pk": "whois.pknic.net.pk",
  "pl": "whois.dns.pl",
  "pm": "whois.nic.pm",
  "pn": "whois.nic.pn",
  "pr": "whois.nic.pr",
  "pro": "whois.dotproregistry.net",
  "ps": "whois.pnina.ps",
  "pt": "whois.dns.pt",
  "pw": "whois.nic.pw",
  "qa": "whois.registry.qa",
  "re": "whois.nic.re",
  "ro": "whois.rotld.ro",
  "rs": "whois.rnids.rs",
  "ru": "whois.tcinet.ru",
  "rw": "whois.ricta.org.rw",
  "sa": "whois.nic.net.sa",
  "sb": "whois.nic.net.sb",
  "sc": "whois2.afilias-grs.net",
  "sd": "whois.sd",
  "se": "whois.iis.se",
  "sg": "whois.sgnic.sg",
  "sh": "whois.nic.sh",
  "si": "whois.arnes.si",
  "sk": "whois.sk-nic.sk",
  "sl": "whois.nic.sl",
  "sm": "whois.nic.sm",
  "sn": "whois.nic.sn",
  "so": "whois.nic.so",
  "sr": "whois.nic.sr",
  "ss": "whois.nic.ss",
  "st": "whois.nic.st",
  "su": "whois.tcinet.ru",
  "sv": "whois.svnet.sv",
  "sx": "whois.sx",
  "sy": "whois.tld.sy",
  "sz": "whois.nic.sz",
  "tc": "whois.meridiantld.net",
  "td": "whois.nic.td",
  "tel": "whois.nic.tel",
  "tf": "whois.nic.tf",
  "tg": "whois.nic.tg",
  "th": "whois.thnic.co.th",
  "tj": "whois.nic.tj",
  "tk": "whois.dot.tk",
  "tl": "whois.nic.tl",
  "tm": "whois.nic.tm",
  "tn": "whois.ati.tn",
  "to": "whois.tonic.to",
  "tp": "whois.nic.tl",
  "tr": "whois.nic.tr",
  "travel": "whois.nic.travel",
  "tv": "tvwhois.verisign-grs.com",
  "tz": "whois.tznic.or.tz",
  "ua": "whois.ua",
  "ug": "whois.co.ug",
  "uk": "whois.nic.uk",
  "us": "whois.nic.us",
  "uy": "whois.nic.org.uy",
  "uz": "whois.cctld.uz",
  "va": "whois.nic.va",
  "vc": "whois2.afilias-grs.net",
  "ve": "whois.nic.ve",
  "vg": "whois.adamsnames.tc",
  "vi": "whois.nic.vi",
  "vn": "whois.vnnic.vn",
  "vu": "vunic.vu",
  "wf": "whois.nic.wf",
  "ws": "whois.website.ws",
  "yt": "whois.nic.yt",
  "za": "whois.registry.net.za",
  "zm": "whois.zicta.zm",
  "zw": "whois.zispa.org.zw",
  "academy": "whois.donuts.co",
  "accountants": "whois.donuts.co",
  "active": "whois.afilias-srs.net",
  "actor": "whois.unitedtld.com",
  "ads": "whois.google.com",
  "adult": "whois.afilias-srs.net",
  "aeg": "whois.nic.aeg",
  "aero": "whois.aero",
  "afl": "whois.nic.afl",
  "agency": "whois.donuts.co",
  "airforce": "whois.unitedtld.com",
  "apartments": "whois.donuts.co",
  "app": "whois.nic.google",
  "apple": "whois.afilias-srs.net",
  "archi": "whois.ksregistry.net",
  "army": "whois.rightside.co",
  "associates": "whois.donuts.co",
  "attorney": "whois.rightside.co",
  "auction": "whois.unitedtld.com",
  "audio": "whois.uniregistry.net",
  "auto": "whois.uniregistry.net",
  "autos": "whois.afilias-srs.net",
  "band": "whois.rightside.co",
  "bar": "whois.nic.bar",
  "bargains": "whois.donuts.co",
  "beer": "whois-dub.mm-registry.com",
  "best": "whois.nic.best",
  "bid": "whois.nic.bid",
  "bike": "whois.donuts.co",
  "bingo": "whois.donuts.co",
  "bio": "whois.ksregistry.net",
  "biz": "whois.nic.biz",
  "black": "whois.afilias.net",
  "blackfriday": "whois.uniregistry.net",
  "blue": "whois.afilias.net",
  "boutique": "whois.donuts.co",
  "builders": "whois.donuts.co",
  "business": "whois.donuts.co",
  "buzz": "whois.nic.buzz",
  "cab": "whois.donuts.co",
  "cafe": "whois.donuts.co",
  "cam": "whois.ksregistry.net",
  "camera": "whois.donuts.co",
  "camp": "whois.donuts.co",
  "capital": "whois.donuts.co",
  "cards": "whois.donuts.co",
  "care": "whois.donuts.co",
  "career": "whois.nic.career",
  "careers": "whois.donuts.co",
  "cash": "whois.donuts.co",
  "casino": "whois.donuts.co",
  "catering": "whois.donuts.co",
  "center": "whois.donuts.co",
  "ceo": "whois.nic.ceo",
  "chat": "whois.donuts.co",
  "cheap": "whois.donuts.co",
  "christmas": "whois.uniregistry.net",
  "church": "whois.donuts.co",
  "city": "whois.donuts.co",
  "claims": "whois.donuts.co",
  "cleaning": "whois.donuts.co",
  "click": "whois.uniregistry.net",
  "clinic": "whois.donuts.co",
  "clothing": "whois.donuts.co",
  "club": "whois.nic.club",
  "coach": "whois.donuts.co",
  "codes": "whois.donuts.co",
  "coffee": "whois.donuts.co",
  "college": "whois.centralnic.com",
  "community": "whois.donuts.co",
  "company": "whois.donuts.co",
  "computer": "whois.donuts.co",
  "condos": "whois.donuts.co",
  "construction": "whois.donuts.co",
  "consulting": "whois.uniregistry.net",
  "contact": "whois.nic.contact",
  "contractors": "whois.donuts.co",
  "cool": "whois.donuts.co",
  "country": "whois-dub.mm-registry.com",
  "coupons": "whois.donuts.co",
  "courses": "whois.aridnrs.net.au",
  "credit": "whois.donuts.co",
  "creditcard": "whois.donuts.co",
  "cricket": "whois.nic.cricket",
  "cruises": "whois.donuts.co",
  "dad": "whois.nic.google",
  "dance": "whois.unitedtld.com",
  "date": "whois.nic.date",
  "dating": "whois.donuts.co",
  "deals": "whois.donuts.co",
  "degree": "whois.rightside.co",
  "delivery": "whois.donuts.co",
  "democrat": "whois.unitedtld.com",
  "dental": "whois.donuts.co",
  "dentist": "whois.rightside.co",
  "desi": "whois.ksregistry.net",
  "diamonds": "whois.donuts.co",
  "diet": "whois.uniregistry.net",
  "digital": "whois.donuts.co",
  "direct": "whois.donuts.co",
  "directory": "whois.donuts.co",
  "discount": "whois.donuts.co",
  "dog": "whois.donuts.co",
  "domains": "whois.donuts.co",
  "download": "whois.nic.download",
  "earth": "whois.nic.earth",
  "education": "whois.donuts.co",
  "email": "whois.donuts.co",
  "energy": "whois.donuts.co",
  "engineer": "whois.rightside.co",
  "engineering": "whois.donuts.co",
  "enterprises": "whois.donuts.co",
  "equipment": "whois.donuts.co",
  "estate": "whois.donuts.co",
  "events": "whois.donuts.co",
  "exchange": "whois.donuts.co",
  "expert": "whois.donuts.co",
  "exposed": "whois.donuts.co",
  "express": "whois.donuts.co",
  "fail": "whois.donuts.co",
  "faith": "whois.nic.faith",
  "family": "whois.rightside.co",
  "fan": "whois.nic.fan",
  "farm": "whois.donuts.co",
  "fashion": "whois-dub.mm-registry.com",
  "feedback": "whois.nic.feedback",
  "finance": "whois.donuts.co",
  "financial": "whois.donuts.co",
  "fish": "whois.donuts.co",
  "fitness": "whois.donuts.co",
  "flights": "whois.donuts.co",
  "florist": "whois.donuts.co",
  "flowers": "whois.uniregistry.net",
  "football": "whois.donuts.co",
  "forsale": "whois.unitedtld.com",
  "foundation": "whois.donuts.co",
  "fun": "whois.nic.fun",
  "fund": "whois.donuts.co",
  "furniture": "whois.donuts.co",
  "futbol": "whois.unitedtld.com",
  "fyi": "whois.donuts.co",
  "gallery": "whois.donuts.co",
  "games": "whois.rightside.co",
  "gift": "whois.uniregistry.net",
  "gives": "whois.rightside.co",
  "glass": "whois.donuts.co",
  "gmbh": "whois.donuts.co",
  "gold": "whois.donuts.co",
  "golf": "whois.donuts.co",
  "graphics": "whois.donuts.co",
  "gratis": "whois.donuts.co",
  "green": "whois.afilias.net",
  "gripe": "whois.donuts.co",
  "group": "whois.donuts.co",
  "guide": "whois.donuts.co",
  "guitars": "whois.uniregistry.net",
  "guru": "whois.donuts.co",
  "healthcare": "whois.donuts.co",
  "help": "whois.uniregistry.net",
  "here": "whois.nic.google",
  "hiphop": "whois.uniregistry.net",
  "hiv": "whois.uniregistry.net",
  "hockey": "whois.donuts.co",
  "holdings": "whois.donuts.co",
  "holiday": "whois.donuts.co",
  "house": "whois.donuts.co",
  "how": "whois.nic.google",
  "immo": "whois.donuts.co",
  "industries": "whois.donuts.co",
  "ink": "whois.centralnic.com",
  "institute": "whois.donuts.co",
  "insure": "whois.donuts.co",
  "international": "whois.donuts.co",
  "investments": "whois.donuts.co",
  "irish": "whois.afilias-srs.net",
  "jewelry": "whois.donuts.co",
  "jobs": "whois.nic.jobs",
  "kim": "whois.afilias.net",
  "kitchen": "whois.donuts.co",
  "land": "whois.donuts.co",
  "lawyer": "whois.rightside.co",
  "lease": "whois.donuts.co",
  "legal": "whois.donuts.co",
  "lgbt": "whois.afilias.net",
  "life": "whois.donuts.co",
  "lighting": "whois.donuts.co",
  "limited": "whois.donuts.co",
  "limo": "whois.donuts.co",
  "live": "whois.rightside.co",
  "loans": "whois.donuts.co",
  "london": "whois.london.nic",
  "lotto": "whois.afilias.net",
  "love": "whois.centralnic.com",
  "ltd": "whois.donuts.co",
  "luxe": "whois-dub.mm-registry.com",
  "luxury": "whois.nic.luxury",
  "mail": "whois.nic.mail",
  "maison": "whois.donuts.co",
  "management": "whois.donuts.co",
  "market": "whois.rightside.co",
  "marketing": "whois.donuts.co",
  "mba": "whois.donuts.co",
  "media": "whois.donuts.co",
  "memorial": "whois.donuts.co",
  "men": "whois.nic.men",
  "menu": "whois.nic.menu",
  "moe": "whois.nic.moe",
  "money": "whois.donuts.co",
  "mortgage": "whois.rightside.co",
  "movie": "whois.donuts.co",
  "navy": "whois.rightside.co",
  "network": "whois.donuts.co",
  "new": "whois.nic.google",
  "news": "whois.rightside.co",
  "ninja": "whois.unitedtld.com",
  "one": "whois.nic.one",
  "online": "whois.centralnic.com",
  "partners": "whois.donuts.co",
  "parts": "whois.donuts.co",
  "party": "whois.nic.party",
  "pharmacy": "whois.dotpharmacy.net",
  "photo": "whois.uniregistry.net",
  "photography": "whois.donuts.co",
  "photos": "whois.donuts.co",
  "pictures": "whois.donuts.co",
  "pink": "whois.afilias.net",
  "pizza": "whois.donuts.co",
  "place": "whois.donuts.co",
  "plumbing": "whois.donuts.co",
  "plus": "whois.donuts.co",
  "productions": "whois.donuts.co",
  "promo": "whois.nic.promo",
  "properties": "whois.donuts.co",
  "property": "whois.uniregistry.net",
  "qpon": "whois.nic.qpon",
  "recipes": "whois.donuts.co",
  "red": "whois.afilias.net",
  "rehab": "whois.rightside.co",
  "reisen": "whois.donuts.co",
  "rentals": "whois.donuts.co",
  "repair": "whois.donuts.co",
  "report": "whois.donuts.co",
  "republican": "whois.rightside.co",
  "rest": "whois.centralnic.com",
  "restaurant": "whois.donuts.co",
  "review": "whois.nic.review",
  "reviews": "whois.unitedtld.com",
  "rip": "whois.rightside.co",
  "rocks": "whois.unitedtld.com",
  "rodeo": "whois-dub.mm-registry.com",
  "rsvp": "whois.nic.google",
  "run": "whois.donuts.co",
  "sale": "whois.rightside.co",
  "salon": "whois.donuts.co",
  "sarl": "whois.donuts.co",
  "school": "whois.donuts.co",
  "schule": "whois.donuts.co",
  "science": "whois.nic.science",
  "services": "whois.donuts.co",
  "sex": "whois.afilias-srs.net",
  "sexy": "whois.uniregistry.net",
  "shiksha": "whois.afilias-srs.net",
  "shoes": "whois.donuts.co",
  "show": "whois.donuts.co",
  "singles": "whois.donuts.co",
  "site": "whois.centralnic.com",
  "soccer": "whois.donuts.co",
  "social": "whois.unitedtld.com",
  "software": "whois.rightside.co",
  "solar": "whois.donuts.co",
  "solutions": "whois.donuts.co",
  "space": "whois.nic.space",
  "studio": "whois.rightside.co",
  "style": "whois.donuts.co",
  "sucks": "whois.nic.sucks",
  "supplies": "whois.donuts.co",
  "supply": "whois.donuts.co",
  "support": "whois.donuts.co",
  "surf": "whois-dub.mm-registry.com",
  "surgery": "whois.donuts.co",
  "systems": "whois.donuts.co",
  "tax": "whois.donuts.co",
  "taxi": "whois.donuts.co",
  "team": "whois.donuts.co",
  "technology": "whois.donuts.co",
  "tennis": "whois.donuts.co",
  "theater": "whois-dub.mm-registry.com",
  "theatre": "whois.nic.theatre",
  "tickets": "whois.centralnic.com",
  "tips": "whois.donuts.co",
  "tires": "whois.donuts.co",
  "today": "whois.donuts.co",
  "tools": "whois.donuts.co",
  "tours": "whois.donuts.co",
  "town": "whois.donuts.co",
  "toys": "whois.donuts.co",
  "trade": "whois.nic.trade",
  "training": "whois.donuts.co",
  "university": "whois.donuts.co",
  "vacations": "whois.donuts.co",
  "ventures": "whois.donuts.co",
  "video": "whois.rightside.co",
  "villas": "whois.donuts.co",
  "vin": "whois.donuts.co",
  "vip": "whois.centralnic.com",
  "vision": "whois.donuts.co",
  "vodka": "whois-dub.mm-registry.com",
  "voyage": "whois.donuts.co",
  "watch": "whois.rightside.co",
  "webcam": "whois.nic.webcam",
  "website": "whois.nic.website",
  "wedding": "whois-dub.mm-registry.com",
  "wiki": "whois.nic.wiki",
  "win": "whois.nic.win",
  "wine": "whois.donuts.co",
  "work": "whois-dub.mm-registry.com",
  "works": "whois.donuts.co",
  "world": "whois.donuts.co",
  "wtf": "whois.donuts.co",
  "xyz": "whois.nic.xyz",
  "yoga": "whois-dub.mm-registry.com",
  "zone": "whois.donuts.co",
};

module.exports = whoisServers;
