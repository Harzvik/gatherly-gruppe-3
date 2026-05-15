# Gatherly Gruppe 3

## 📌 Hva gjør prosjektet?

Gatherly er en digital plattform utviklet for privatpersoner som ønsker å delta på sosiale eller faglige arrangementer. Gatherly har samlet alle arrangementer på én sentral plattform, der brukere enkelt kan oppdage, opprette og delta på arrangementer basert på sine interesser. Prosjektet gir brukere mulighet til å filtrere arrangementer etter pris, kategori og dato, samt engasjere seg gjennom innlegg, kommentarer og reaksjoner. Dette vil skape et sosialt og oversiktlig system for arrangementer som senker terskelen for å finne og delta på aktiviteter.

## 🎯 Hvorfor prosjektet er nyttig?

I dag er informasjonen om arrangementer og meetups spredt over mange ulike plattformer, noe som gjør det tidskrevende og frustrerende å finne relevante aktiviteter. Brukere må navigere rundt mellom Facebook-grupper, Facebook-arrangementer, Meetup (nettsiden), Instagram, lokale nettsider og mange andre kanaler for å holde oversikt over hva som skjer i deres områder. Gatherly vil løse dette problemet ved å samle alle arrangementer på én plattform.

## 🗄 Mappestruktur i prosjektet:

```
public
│   └── assets
│       ├── component_assets
│       └── gatherly_logo.png
├── src
│   ├── css
│   │   ├── components
│   │   ├── pages
│   │   ├── reset.css
│   │   └── variables.css
│   └── ts
│       ├── api
│       ├── components
│       ├── functions
│       ├── pages
│       └── types
├── tsconfig.json
└── *.html
```

## 👩‍💻 Slik kommer du igang:

1. Clone repo med denne linken: https://github.com/Harzvik/gatherly-gruppe-3.git.
2. Kjør kommandoen `npm install` for å installere alle avhengigheter.
3. Kjør kommandoen `npm run dev` for å starte serveren.

## ⚙️ Kort om `src/ts/api/config.ts`

API_KEY er flyttet til .env.local, config.ts importerer nøkkelen derfra.

Denne filen samler API-oppsett på ett sted:

- `API_BASE_URL`: base-URL som brukes av alle API-kall.
- `API_KEY`: nøkkel for autorisasjon i API-kall.

Fordelen er at du kun trenger å oppdatere én fil hvis URL eller nøkkel endres.

## 🚧 Hvem vedlikeholder prosjektet?

- [Eileen Kim](github.com/eileenkim-0) (Prosjektleder)
- [Alex Harsvik](github.com/Harzvik) (Github-ansvarlig)
- Bamo Mohammadi
