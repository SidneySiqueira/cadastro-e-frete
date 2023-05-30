import React from 'react';

import { useState } from "react";

import * as S from "./styled";
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

interface Props {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setShowCalculated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setShowLogin, setShowCalculated }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { users } : any = useSelector((state: RootState) => state.api);

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (users.email === email && users.password === password) {
            setShowCalculated(true)
        }
        setEmail('');
        setPassword('');
    };
    return (
        <S.Wrapper>
            <S.Container>
                <S.LoginForm onSubmit={handleSubmit}>
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        value={email}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        value={password}
                        color='primary'
                        onChange={handlePasswordChange}
                    />
                    <S.ButtonLogin
                        type="submit"
                    >
                        Enviar
                    </S.ButtonLogin>
                    <S.ButtonCancel
                        type="submit"
                        onClick={() => setShowLogin(false)}
                    >
                        Cancelar
                    </S.ButtonCancel>
                </S.LoginForm>
            </S.Container>
        </S.Wrapper>
    );
};

export default Login;