import React, { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/Redux/store';
import { AddApi, updateApi } from '@/Redux/apiSlice';
import * as S from "./styled";
import formatPhoneNumber from '@/utills/formatedNumber';
import { UserState } from '@/Redux/selectedUserSlice';
import { FormData } from '@/utills/type';

interface Props {
    setLoading: React.Dispatch<SetStateAction<boolean>>
    setShowModal: React.Dispatch<SetStateAction<boolean>>
}

const Modal = ({ setLoading, setShowModal }: Props) => {
    const { users } = useSelector((state: RootState) => state.api);
    const selectUser = useSelector((state: RootState) => state.selectUser.selectUser);
    const [formData, setFormData] = useState<FormData>(selectUser as FormData);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    const handlePost = async (array: UserState) => {
        await dispatch(AddApi(array));
    };

    const handlePut = async (id: string, patchData: UserState) => {
        await dispatch(updateApi({ item: id, patchData: patchData }));
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        setLoading(true);

        if (!formData) {
            return;
        }

        // const usersArray = users ? Object.entries(users) : [];

        console.log("usersArray", users);

        // const existingUser = usersArray?.find(([_, user]) => {
        //     const { id } = user;
        //     return (
        //         id === formData.id
        //     );
        // });

        // console.log("existingUser", existingUser);

        // if (existingUser) {
        // } else {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const newFormData = { ...formData, id: randomNumber };
        await handlePut(formData.username, newFormData as unknown as UserState);
        await handlePost(newFormData as unknown as UserState);
        // }

        setShowModal(false);
        // setTimeout(() => {
        //     document.location.reload();
        // }, 500);
    };

    return (
        <S.Wrapper>
            <S.Container>
                <S.Close className="close" onClick={handleCloseModal}>
                    X
                </S.Close>
                <S.Title>Cadastro</S.Title>
                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <S.FormGroup>
                        <S.Atribute>Usuário</S.Atribute>
                        <S.Input
                            type="text" {...register('username', { required: 'Necessário ter um nome' })}
                            value={formData.username}
                            onChange={handleInputChange}
                            maxLength={15}
                        />
                        {errors.username && <S.Error className="error">{errors.username.message}</S.Error>}
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Atribute>Nome</S.Atribute>
                        <S.Input
                            type="text" {...register('firstName', { required: 'Necessário ter um nome' })}
                            value={formData.firstName}
                            onChange={handleInputChange}
                            maxLength={15}
                        />
                        {errors.firstName && <S.Error className="error">{errors.firstName.message}</S.Error>}
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Atribute>Sobrenome</S.Atribute>
                        <S.Input
                            type="text" {...register('lastName', { required: 'Necessário ter um sobrenome' })}
                            value={formData.lastName}
                            onChange={handleInputChange}
                            maxLength={15}
                        />
                        {errors.lastName && <S.Error className="error">{errors.lastName.message}</S.Error>}
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Atribute>Numero</S.Atribute>
                        <S.Input
                            type="text" {...register('phone', { required: 'Necessário ter um numero' })}
                            value={formatPhoneNumber(formData.phone)}
                            onChange={handleInputChange}
                            maxLength={11}
                        />
                        {errors.phone && <S.Error className="error">{errors.phone.message}</S.Error>}
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Atribute>Email</S.Atribute>
                        <S.Input
                            type="email" {...register('email', { required: 'Necessário ter um e-mail' })}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <S.Error className="error">{errors.email.message}</S.Error>}

                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Atribute>Senha</S.Atribute>
                        <S.Input
                            type="text" {...register('password', { required: 'Necessário ter uma senha' })}
                            value={formatPhoneNumber(formData.password)}
                            onChange={handleInputChange}
                            maxLength={11}
                        />
                        {errors.password && <S.Error className="error">{errors.password.message}</S.Error>}
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Add type="submit">Salvar</S.Add>
                        <S.Cancel type="button" onClick={handleCloseModal}>
                            Cancelar
                        </S.Cancel>
                    </S.FormGroup>
                </S.Form>
            </S.Container>
        </S.Wrapper>
    );
};

export default Modal;
