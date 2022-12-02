import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import SignInScreen from './screens/SignInScreen';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import CreateAdminScreen from './screens/createAdminScreen';
import ProductsScreen from './screens/productsScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import ExpenseAnalysisScreen from './screens/ExpenseAnalysisScreen'
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'
import {languages} from './utils/languages'
import cookies from 'js-cookie'
import { IconButton, Badge, Fab } from '@material-ui/core';
import { MdAddShoppingCart, MdPersonAdd, MdArrowDropUp } from "react-icons/md"
import { FiUser, FiUserCheck } from "react-icons/fi"
import LogoImage from './LogoIncon.jpg'
import MutualFundScreen from './screens/MutualFundScreen';
import ScrollTop from './utils/ScrollTop';

function App(props) {

    const { t } = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || "en";
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 

    const cartList = useSelector(state => state.cartList);
    const {cartItems, loading, error} = cartList;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open")
    } 
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }
    
    return (
    <BrowserRouter>
    <div id="back-to-top-anchor"/>
    <ScrollTop {...props}>
        <Fab color="primary" size="small">
            <MdArrowDropUp fontSize="28px"/>
        </Fab>
    </ScrollTop>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick= {openMenu}>
                    &#9776;
                </button>
                <Link className="brand" to="/">{t('xingShop')}</Link>
            </div>
            {loading?<div> </div>:
            (error)?error.message:(
            <div className="header-links">
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={cartItems.length} color="primary">
                <MdAddShoppingCart fontSize={"large"}/>
              </Badge>
            </IconButton>
            <IconButton component={Link} to={userInfo?"/profile":"/signin"} color="inherit">
                {userInfo?<FiUserCheck fontSize={"large"}/>:<FiUser fontSize={"large"}/>}
            </IconButton>
          <div className="dropdown">
          <select className="lang_select" name="langSelect" defaultValue={currentLanguageCode} onChange={(e) => i18next.changeLanguage(e.target.value)}>
              {languages.map(({code, name}) =>
                    <option key={name} className="lang_select" value={code}>{name}</option>
            )}
          </select>
          </div>
          {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <IconButton href="#" color="inherit"> <MdPersonAdd fontSize={"large"}/> </IconButton>
            <ul className="dropdown-content">
              <li>
                <Link to="/orders">Orders</Link>
                <Link to="/products">Products</Link>
                <Link to="/expenses">Expense</Link>
                <Link to="/expensesAnalysis">Expense Analysis</Link>
                <Link to="/mutualfunds">Mutual Funds</Link>
              </li>
            </ul>
          </div>
        )}
        </div>
         )}
        </header>
        <aside className="sidebar">
            <h3>{t("Shopping Categories")}</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul className="categories">
                    <li>
                        <Link to="/category/Vegetables" onClick={closeMenu}>{t("Vegetables")}</Link>
                    </li>
                    <li>
                        <Link to="/category/FreshFruits" onClick={closeMenu}>{t("FreshFruits")}</Link>
                    </li>
                    <li>
                        <Link to="/category/Grocery" onClick={closeMenu}>{t("Grocery")}</Link>
                    </li>
                    <li>
                        <Link to="/category/Medicine" onClick={closeMenu}>{t("Medicine")}</Link>
                    </li>
                    <li>
                        <Link to="/category/Stationary" onClick={closeMenu}>{t("Stationary")}</Link>
                    </li>
                    <li>
                        <Link to="/category/KidsZone" onClick={closeMenu}>{t("KidsZone")}</Link>
                    </li>
                    <li>
                        <Link to="/category/Others" onClick={closeMenu}>{t("Others")}</Link>
                    </li>
                    <li>
                        <img className="logo-image" src={LogoImage} alt="logo"></img>
                    </li>
                </ul>
        </aside>
        <main className="main">
            <div className="content">
                <Route path="/orders" component={OrdersScreen}/>
                <Route path="/profile" component={ProfileScreen}/>
                <Route path="/products" component={ProductsScreen}/>
                <Route path="/expenses" component={ExpenseScreen}/>
                <Route path="/expensesAnalysis" component={ExpenseAnalysisScreen}/>
                <Route path="/mutualfunds" component={MutualFundScreen}/>
                <Route path="/createadmin" component={CreateAdminScreen}/>
                <Route path="/register" component={RegisterScreen}/>
                <Route path="/signin" component={SignInScreen}/>
                <Route path="/cart/:id?" component={CartScreen}/>
                <Route path="/category/:id" component={HomeScreen} />
                <Route path="/" exact={true} component={HomeScreen}/>
            </div>
        </main>
        <footer className="footer">
        xingSoft - Alright reserved.
        </footer>
    </div>
    </BrowserRouter>
);
}

export default App;
