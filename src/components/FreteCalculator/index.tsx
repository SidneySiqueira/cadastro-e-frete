import React, { useState } from 'react';
import { TextField } from '@mui/material';

import * as S from './styled';

const FreteCalculator = () => {
    const [weight, setWeight] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [distance, setDistance] = useState('');
    const [valueShipping, setValueShipping] = useState('');

    const calcularFrete = () => {
        const valor = ((parseFloat(weight) + parseFloat(length) + parseFloat(width) + parseFloat(height))/6000) * parseFloat(distance) * 0.5;

        setValueShipping(valor.toFixed(2));
    };

    return (
        <S.Container>
            <S.Title>Calculadora de Frete</S.Title>
            <S.ParamBox>
                <TextField
                    label="Peso (em kg):"
                    variant="outlined"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </S.ParamBox>
            <S.ParamBox>
                <TextField
                    label="Comprimento (em cm):"
                    variant="outlined"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </S.ParamBox>
            <S.ParamBox>
                <TextField
                    label="Largura (em cm):"
                    variant="outlined"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
            </S.ParamBox>
            <S.ParamBox>
                <TextField
                    label="Altura (em cm):"
                    variant="outlined"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </S.ParamBox>
            <S.ParamBox>
                <TextField
                    label="Distância (em km):"
                    variant="outlined"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
            </S.ParamBox>
            <S.ButtonLogin
                        type="submit"
                        onClick={calcularFrete}
                    >
                        Calcular
                    </S.ButtonLogin>
            {valueShipping && (
                <S.ParamBox>
                    <S.Total>Valor do Frete: R$ {valueShipping}</S.Total>
                </S.ParamBox>
            )}
        </S.Container>
    );
};

export default FreteCalculator;
