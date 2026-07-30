import raw from '@data/site.json';

// The CMS only exposes one editable phone field (the human-readable
// "(954) 426-6010" form). Every tel: link and schema.org telephone value in
// the codebase needs the E.164-ish "+19544266010" form instead — rather than
// asking a non-technical editor to keep two numbers in sync, it's derived
// here once, at build time, from the single source of truth.
function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `+1${digits}`;
}

const phoneRaw = toTelHref(raw.phone);

const site = {
  ...raw,
  phoneRaw,
  // callCta.href was a second hand-maintained "tel:+1..." string in the raw
  // JSON — derived here too so there's only ever one phone number to edit.
  callCta: { ...raw.callCta, href: `tel:${phoneRaw}` },
};

export default site;
