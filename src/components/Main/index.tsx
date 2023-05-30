import React, { useEffect, useState } from 'react';
import * as S from './styled';
import Modal from '../Modal';
import { CircularProgress } from '@mui/material';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from '@/Redux/apiSlice';
import { setSelectedUser } from '@/Redux/selectedUserSlice';
import { FormData } from '@/utills/type';
import Login from '../Login';
import FreteCalculator from '../FreteCalculator';

const initialFormData: FormData = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    userStatus: 3,
};

interface Props {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({ loading, setLoading }: Props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCalculated, setShowCalculated] = useState(false);

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(fetchApi())
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    
    const handleAdd = () => {
        dispatch(setSelectedUser(initialFormData));
        setShowModal(!showModal);
    };

    const renderButtons = () => {
        return (
            <S.BoxButtons>
                <S.Button onClick={handleAdd}>Cadastre-se</S.Button>
                <S.Button onClick={() => setShowLogin(!showLogin)}>Login</S.Button>
            </S.BoxButtons>
        );
    };

    return (
        <S.Container>
            {loading ? (
                <S.Wrapper>
                    <CircularProgress />
                </S.Wrapper>
            ) : (
                <>
                    {!showCalculated && renderButtons()}
                    {showModal && !showCalculated && <Modal setLoading={setLoading} setShowModal={setShowModal} />}
                    {showLogin && !showCalculated && <Login setShowLogin={setShowLogin} setShowCalculated={setShowCalculated}/>}
                    {showCalculated && <FreteCalculator/>}
                </>
            )}
        </S.Container>
    );
};

export default Main;