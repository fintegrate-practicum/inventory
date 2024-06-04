import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { addComponent } from '../features/component/componentSlice';

interface IFormInput {
    id:string;
    name: string;
    purchasePrice: number;
    isAlone: boolean;
    description?: string;
    salePrice?: number;

}
const notSaleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3,"name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.number().required("purchase price is a required field").positive("price must be positive"),
    isAlone: yup.boolean()
});

const saleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3,"name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.number().required("purchase price is a required field").positive("price must be positive"),
    isAlone: yup.boolean(),
    description: yup.string().required("description is a required files"),
    salePrice: yup.number().default(0).required("sale price is a required files")
});



export const ComponentForm: React.FC<IFormInput> = () => {
    const dispatch = useDispatch();

    const [isAloneChecked, setIsAloneChecked] = useState(false);
    const { register, handleSubmit, formState: { errors } } =
        useForm<IFormInput>({ resolver: isAloneChecked && yupResolver(saleAloneSchema) || yupResolver(notSaleAloneSchema) });

    const save = (data: IFormInput) => {
        dispatch(addComponent(data));
        console.log();
    }

    const handleIsAloneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAloneChecked(event.target.checked);
    };

    return (
        <form onSubmit={handleSubmit(save)}>
            <label>name</label>
            <input {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}

            <label>purchase price</label>
            <input {...register("purchasePrice")} />
            {errors.purchasePrice && <p>{errors.purchasePrice.message}</p>}

            <label>can be sold separately</label>
            <input type="checkbox" {...register("isAlone")}
                checked={isAloneChecked}
                onChange={handleIsAloneChange} />

            {isAloneChecked && (
                <>
                    <label>description</label>
                    <input {...register("description")} />
                    {errors.description && <p>{errors.description.message}</p>}

                    <label>salePrice</label>
                    <input {...register("salePrice")} />
                    {errors.salePrice && <p>{errors.salePrice.message}</p>}
                </>
            )}

            <input type="submit" />
        </form>
    )
}