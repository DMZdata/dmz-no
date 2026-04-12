const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} DMZ DATA AS — Org.nr 984 433 608</p>
        <p className="mt-1">Sandbrekkveien 66, 3949 Porsgrunn</p>
      </div>
    </footer>
  );
};

export default Footer;
