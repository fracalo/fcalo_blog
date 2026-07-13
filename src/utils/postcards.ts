export type Postcard = {
  slug: string;
  text: string;
  city: string;
  country: string;
  date: string;
  photoFile: string;
};

const slugify = (fileName: string): string =>
  fileName
    .replace(/\.[^.]+$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

const rawPostcards: Array<Omit<Postcard, "slug"> & { photoFile: string }> = [
  {
    text: "Thanks Ramona",
    city: "Bali",
    country: "Indonesia",
    date: "August 25 2019",
    photoFile: "bali-coccia.jpg",
  },
  {
    text: "Thanks Coccia",
    city: "Marina Bay",
    country: "Singapore",
    date: "August 30 2019",
    photoFile: "marina-bay.jpg",
  },
  {
    text: "Thanks Coccia & Ramona",
    city: "Konnichiwa",
    country: "Japan",
    date: "September 2 2019",
    photoFile: "konnichiwa.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Boston",
    country: "U.S.A.",
    date: "November 16 2019",
    photoFile: "boston-cri.jpg",
  },
  {
    text: "Thanks Franco & Pia",
    city: "Boston - Mariel Cocina Cubana",
    country: "U.S.A.",
    date: "December 4 2019",
    photoFile: "boston-franco-pia.jpg",
  },
  {
    text: "Thanks Franco & Pia",
    city: "London",
    country: "U.K.",
    date: "December 13 2020",
    photoFile: "london-pia.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "London",
    country: "U.K.",
    date: "January 10 2020",
    photoFile: "london-cri.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Miami - Southbeach",
    country: "U.S.A.",
    date: "February 16 2020",
    photoFile: "southbeach-cri.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Miami - Southbeach",
    country: "U.S.A.",
    date: "February 16 2020",
    photoFile: "southbeach-cri2.jpg",
  },
  {
    text: "Thanks Cinzia & Giancarlo",
    city: "Trentino",
    country: "Italy",
    date: "February 25 2020",
    photoFile: "trentino-cinzia.jpg",
  },
  {
    // NOTE: the original site had city: 'London' here (a copy-paste slip from the
    // entry above) - corrected based on the filename/photo itself.
    text: "Thanks Franco & Pia",
    city: "Zagreb",
    country: "Croatia",
    date: "March 13 2020",
    photoFile: "zagreb-pia-franco.jpg",
  },
  {
    text: "Thanks Marzia & Matteo",
    city: "End of the world",
    country: "Patagonia",
    date: "March 4 2020",
    photoFile: "patagonia-marzia-matteo.jpg",
  },
  {
    // NOTE: the original site had country: 'Singapore' here - Koh Chang is in
    // Thailand, corrected based on the filename/photo itself.
    text: "Thanks Sveva, Clara, Lisa & Massimo",
    city: "Koh Chang",
    country: "Thailand",
    date: "September 2020",
    photoFile: "koh-chang-clara-sveva.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Boston",
    country: "U.S.A.",
    date: "September 2020",
    photoFile: "boston-cri2.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "L.A.",
    country: "U.S.A.",
    date: "December 2020",
    photoFile: "cali-cri.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "L.A.",
    country: "U.S.A.",
    date: "December 2020",
    photoFile: "la-cri.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Boston",
    country: "U.S.A.",
    date: "September 2020",
    photoFile: "boston-flashy-cri.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Santa Monica",
    country: "U.S.A.",
    date: "December 15 2020",
    photoFile: "horror-santa-monica-cri.jpg",
  },
  {
    text: "Thanks Cri & Kate",
    city: "Santa Monica",
    country: "U.S.A.",
    date: "December 15 2020",
    photoFile: "santa-monica-harbor.jpg",
  },
  {
    text: "Thanks Cri, Kate & Mothman",
    city: "Newport",
    country: "U.S.A.",
    date: "September 3 2020",
    photoFile: "newport1.jpg",
  },
  {
    text: "Thanks Cri, Kate & Mothman",
    city: "Newport",
    country: "U.S.A.",
    date: "September 3 2020",
    photoFile: "newport2.jpg",
  },
  {
    text: "Thanks Cri, Kate & Mothman",
    city: "Salem",
    country: "U.S.A.",
    date: "September 23 2020",
    photoFile: "GreetingsFromSalem.jpg",
  },
  {
    text: "Thanks Cri, Kate & Mothman",
    city: "Salem",
    country: "U.S.A.",
    date: "September 23 2020",
    photoFile: "WitchYouWereHere.jpg",
  },
];

export const postcards: Postcard[] = rawPostcards.map((p) => ({
  ...p,
  slug: slugify(p.photoFile),
}));
