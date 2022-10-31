import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getCurrentPrice } from "../services/apiService";
import ErrorModal from "../ErrorModal";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPrice, setSelectedCountry } from '../services/stateService';
import './header.scss'
//import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
function HeaderComponent () {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // useSelector hook который помогает вам следить за redux state и возвращает нам новое значение
    // useSelector принимает функцию в котором мы получаем всё состояние reduxa и выбираем необходимый
    // useSelector при необходимости запускает рендер компонента.
    // useSelector ловит
    const currentPrice = useSelector((state) => state.currentPrice);
    const selectedCountry = useSelector((state) => state.selectedCountry);
    // useDispatch это фунция отправки действия/action он принимает action, который нужно выполнить
    // в краце это связной между компонентом и redux.
    // dispatch отправляет
    const dispatch = useDispatch();
    // useNavigate это hook, который даёт нам возможность навигировать на другую страничку/компонент
    const navigate = useNavigate();
    // useLocation даёт нам информацию о данной страничке/url. даёт нам где мы находимся.
    const location = useLocation();
    const hourPath = useSelector((state) => state.hourPath);
    const countries = [
        { key: 'ee', title: 'Eesti' },
        { key: 'fi', title: 'Soome' },
        { key: 'lv', title: 'Läti' },
        { key: 'lt', title: 'Leedu' },
    ];

    useEffect(() => {
        (async function () {
            try {
                const response = await getCurrentPrice(selectedCountry);
                // dispatch запустил action, action в свою очередь запустил reducer
                // В reducer передались данные в объект action.payload.
               dispatch(setCurrentPrice(response.data[0].price));
            } catch (error) {
                setShowError(true);
                setErrorMessage(error.message);
            }
        })();
    }, [dispatch, selectedCountry]);

    const radios = [
        { name: 'Low Price', value: '/low' },
        { name: 'High price', value: '/high' },
    ];

    function handleOnChangePrice(event) {
        // event.preventDefault();
        // отправляет на другую страничку
       navigate(event.currentTarget.value);
     
    }

    function handleOnSelectCountry(key, event) {
      dispatch(setSelectedCountry(countries.find(country => country.key === key)));  
    }
    console.log('hourPath',hourPath);
    return (
        <div className="header">
            <Row className="mt-2">
                <Col><h3>Elektrikell</h3></Col>
                <Col>
                {/* <Link to="/high" >Show high price</Link>
                <Link to="/low" >Show low price</Link> 
                Link и useNavigate это по сути одно и тоже
                Link это компонент, который нас отправит по ссылке, которую мы передали props to
                useNavigate - hook, который используем вне JSX
                */}
                    <DropdownButton
                        key="Secondary"
                        id={`dropdown-variants-secondary`}
                        variant="secondary"
                        onSelect={handleOnSelectCountry}
                        title={selectedCountry.title}
                        className="float-end"
                    >
                        {countries.map(country => <Dropdown.Item key={country.key} eventKey={country.key}>{country.title}</Dropdown.Item>)}

                    </DropdownButton>
                </Col>
            </Row>
            <Row className="status">
                <Col>Status</Col>
                <Col className="text-center">
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                                name="radio"
                                value={radio.value}
                                checked={location.pathname.includes(radio.value) || (idx === 0 && location.pathname ==='/')}
                                onChange={handleOnChangePrice}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
                <Col className="text-end">HIND {currentPrice}eur /MWh</Col>
            </Row>
            <ErrorModal errorMessage={errorMessage} show={showError} setShow={setShowError} />
        </div>
    );
}

export default HeaderComponent;
