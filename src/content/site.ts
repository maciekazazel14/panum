// All user-facing copy lives here so the owner can edit without touching components.
// Texts in Polish, keys/identifiers in English.

export const company = {
  name: "Panum",
  tagline: "Druk 3D na zamówienie | Modelowanie 3D | Faktura VAT",
  email: "kontakt@panum.pl",
  phone: "+48 793 143 199",
  phoneHref: "tel:+48793143199",
  hours: "pn–pt 8:00–18:00",
  domain: "panum.pl",
  url: "https://panum.pl",
  // Owner data.
  owner: "Maciej Usielski",
  addressLine: "ul. Osiedle Zalesie 1-2",
  addressCity: "73-108 Kobylanka",
  nip: "8512883515",
  regon: "", // optional — fill in when needed; pages hide this field while empty.
};

export const nav = [
  { href: "#oferta", label: "Oferta" },
  { href: "#materialy", label: "Materiały" },
  { href: "#proces", label: "Jak to działa" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

export const hero = {
  eyebrow: "Druk 3D • Wycena w 4h • Faktura VAT",
  h1: "Druk 3D na zamówienie dla firm i osób prywatnych",
  sub: "Profesjonalny wydruk z Bambu Lab P1S. Faktura VAT, realizacja w 2–5 dni roboczych, wycena w ciągu 4 godzin.",
  ctaPrimary: { label: "Wyślij plik do wyceny", href: "#kontakt" },
  ctaSecondary: { label: "Zadzwoń", href: "tel:+48793143199" },
  badges: [
    "Faktura VAT",
    "Realizacja 2–5 dni",
    "Wycena w 4h",
    "Bambu Lab P1S",
  ],
};

export const services = {
  eyebrow: "Co drukujemy",
  title: "Od prototypów po części użytkowe",
  items: [
    {
      title: "Prototypy i części dla firm",
      desc: "Obudowy elektroniki, mocowania, prototypy produktów, narzędzia montażowe. Wzmacniane filamenty z włóknem węglowym.",
      icon: "chip",
    },
    {
      title: "Części zamienne i naprawcze",
      desc: "Klipy, uchwyty, koła zębate, elementy AGD i sprzętu. Z PLA, PETG, ASA — dobierzemy materiał do zastosowania.",
      icon: "wrench",
    },
    {
      title: "Modele i gadżety",
      desc: "Figurki, modele architektoniczne, inserty do gier planszowych, akcesoria. Wysoka jakość detali.",
      icon: "cube",
    },
  ],
};

export const why = {
  eyebrow: "Dlaczego Panum",
  title: "Wiarygodny partner do druku 3D",
  items: [
    {
      title: "Faktura VAT od ręki",
      desc: "Jesteśmy czynnym VAT-owcem. Faktura wystawiana automatycznie po zaksięgowaniu płatności.",
      icon: "receipt",
    },
    {
      title: "Szybka wycena",
      desc: "Odpowiadamy na zapytania w ciągu 4 godzin w dni robocze. Bez schematu „wycena indywidualna w 24–48h”.",
      icon: "clock",
    },
    {
      title: "Profesjonalny sprzęt",
      desc: "Drukarka Bambu Lab P1S. Wysoka jakość, dokładność do 0,1 mm, szybkie tempo druku.",
      icon: "printer",
    },
    {
      title: "Lokalnie i bezpiecznie",
      desc: "Wysyłka InPost lub odbiór osobisty. Pakowane bezpiecznie z folią i wypełnieniem.",
      icon: "shield",
    },
  ],
};

export const process = {
  eyebrow: "Jak to działa",
  title: "Cztery kroki do gotowego wydruku",
  steps: [
    {
      title: "Prześlij plik lub opisz potrzebę",
      desc: "STL, 3MF, STEP, OBJ. Albo opisz co potrzebujesz — zaprojektujemy.",
    },
    {
      title: "Otrzymaj wycenę w 4h",
      desc: "Cena, termin, materiał, jakość. Bez zobowiązań.",
    },
    {
      title: "Akceptacja i płatność",
      desc: "BLIK, przelew, karta. Faktura VAT na firmę lub paragon.",
    },
    {
      title: "Druk i wysyłka",
      desc: "Realizacja w 2–5 dni roboczych. Status na bieżąco.",
    },
  ],
};

export const materials = {
  eyebrow: "Materiały i parametry",
  title: "Filamenty dobrane do zastosowania",
  rows: [
    { name: "PLA", use: "Modele, prototypy, gadżety", price: "od 0,60 PLN/g" },
    { name: "PETG", use: "Części użytkowe, odporność na temperaturę", price: "od 0,80 PLN/g" },
    { name: "PA-CF", use: "Mocne części techniczne (nylon z włóknem węglowym)", price: "od 2,00 PLN/g" },
    { name: "ASA", use: "Części odporne na UV i pogodę", price: "od 1,20 PLN/g" },
    { name: "TPU", use: "Uszczelki, amortyzatory (elastyczny)", price: "od 1,50 PLN/g" },
  ],
  params: [
    { label: "Wysokość warstwy", value: "0,12 / 0,20 / 0,28 mm" },
    { label: "Maks. obszar druku", value: "256 × 256 × 256 mm" },
    { label: "Wypełnienie", value: "10–100%" },
    { label: "Kolory", value: "standardowe + na zamówienie" },
  ],
};

export const modeling = {
  eyebrow: "Modelowanie 3D",
  title: "Nie masz pliku? Zaprojektujemy.",
  body: "Pracujemy w Blenderze i Plasticity — od prostych obudów po skomplikowane organiczne kształty. Stawka: od 80 PLN netto/h, wycena projektu po krótkim briefie.",
  cta: { label: "Opisz projekt", href: "#kontakt?type=modeling" },
};

export const portfolio = {
  eyebrow: "Portfolio",
  title: "Wybrane wydruki",
  note: "Sekcja będzie sukcesywnie uzupełniana o realne realizacje (po uzyskaniu zgody klientów).",
  // Placeholder grid — owner will swap with real photos.
  items: Array.from({ length: 6 }).map((_, i) => ({
    title: ["Obudowa elektroniki", "Uchwyt techniczny", "Insert do gry", "Prototyp produktu", "Część zamienna", "Model architektoniczny"][i],
    meta: ["PETG, 4h druku", "PA-CF, 6h druku", "PLA, 2h druku", "PETG, 8h druku", "ASA, 3h druku", "PLA, 12h druku"][i],
  })),
};

export const faq = {
  eyebrow: "FAQ",
  title: "Najczęstsze pytania",
  items: [
    {
      q: "Jakie pliki akceptujecie?",
      a: "STL, 3MF, STEP, OBJ. Jeśli masz inny format — napisz, większość plików CAD jesteśmy w stanie przetworzyć.",
    },
    {
      q: "Czy wystawiacie fakturę VAT?",
      a: "Tak, jesteśmy czynnym podatnikiem VAT. Faktura wystawiana automatycznie po opłaceniu zlecenia.",
    },
    {
      q: "Ile trwa realizacja?",
      a: "Standardowo 2–5 dni roboczych od akceptacji wyceny. Pilne zlecenia (24h) za dopłatą 50%.",
    },
    {
      q: "Czy mogę zamówić jedną sztukę?",
      a: "Tak, drukujemy już od jednej sztuki. Minimalna wartość zlecenia: 60 PLN netto.",
    },
    {
      q: "Jakie materiały drukujecie?",
      a: "PLA, PETG, ASA, TPU, PA-CF (nylon z włóknem węglowym). Jeśli potrzebujesz innego — zapytaj.",
    },
    {
      q: "Czy projekty są poufne?",
      a: "Tak. Na życzenie podpisujemy NDA. Pliki nie są udostępniane osobom trzecim ani publikowane.",
    },
    {
      q: "Jak dostarczamy zamówienia?",
      a: "InPost paczkomat (12 PLN), kurier (od 15 PLN) lub odbiór osobisty po umówieniu.",
    },
    {
      q: "Czy oferujecie modelowanie od zera?",
      a: "Tak. Pracujemy w Blenderze i Plasticity. Stawka od 80 PLN netto/h, wycena indywidualna.",
    },
  ],
};

export const contact = {
  eyebrow: "Kontakt",
  title: "Wyślij zapytanie",
  intro: "Odpowiadamy w ciągu 4 godzin w dni robocze. Załącz plik (STL/3MF/STEP/OBJ) lub opisz potrzebę.",
  inquiryTypes: [
    { value: "print-file", label: "Druk z pliku" },
    { value: "modeling", label: "Modelowanie" },
    { value: "project-quote", label: "Wycena projektu" },
    { value: "other", label: "Inne" },
  ],
  rodoLabel: "Wyrażam zgodę na przetwarzanie podanych danych w celu odpowiedzi na zapytanie (zgodnie z polityką prywatności).",
  submitLabel: "Wyślij zapytanie",
  successMsg: "Dziękujemy! Wiadomość wysłana. Odpowiemy w ciągu 4 godzin w dni robocze.",
  errorMsg: "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na kontakt@panum.pl.",
};

export const footer = {
  blurb: company.tagline,
  links: [
    { href: "/", label: "Strona główna" },
    { href: "/#oferta", label: "Oferta" },
    { href: "/#kontakt", label: "Kontakt" },
    { href: "/regulamin", label: "Regulamin" },
    { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  ],
};
