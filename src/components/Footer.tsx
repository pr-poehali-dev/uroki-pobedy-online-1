import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-victory-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo withLabel className="mb-4" />
            <p className="text-sm mt-4 opacity-80">
              Образовательный проект, посвященный сохранению исторической памяти
              о Великой Отечественной войне
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Электронная почта: info@urokipobedy.ru</li>
              <li>Телефон: +7 (999) 123-45-67</li>
              <li>Адрес: г. Москва, ул. Примерная, 123</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-victory-gold transition-colors">О проекте</a></li>
              <li><a href="/materials" className="hover:text-victory-gold transition-colors">Материалы</a></li>
              <li><a href="/login" className="hover:text-victory-gold transition-colors">Личный кабинет</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-700 text-center text-sm opacity-70">
          <p>© {currentYear} Образовательный проект "Уроки Победы". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
