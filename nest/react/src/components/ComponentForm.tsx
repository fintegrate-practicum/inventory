import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import FormData from 'form-data';
import { IComponent } from '../interfaces/IComponent';

const notSaleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.number().required("purchase price is a required field").positive("price must be positive"),
    isAlone: yup.boolean()
});

const saleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.number().required("purchase price is a required field").positive("price must be positive"),
    isAlone: yup.boolean(),
    description: yup.string().required("description is a required field"),
    salePrice: yup.number().required("sale price is a required field").positive("sale price must be positive")
    .test('is-greater-than', 'sale price must be greater than purchase price', function(value) {
      const { purchasePrice } = this.parent; 
      return value > purchasePrice || value === 0; 
    }),

    images: yup.array().min(1, "must be at least 1").max(5, "must be at most 5").required('please select an image')
});

export const ComponentForm: React.FC<IComponent> = () => {
    const [isAloneChecked, setIsAloneChecked] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm<IComponent>({ resolver: isAloneChecked ? yupResolver(saleAloneSchema) : yupResolver(notSaleAloneSchema) });

    const save = (data: IComponent) => {
        if (isAloneChecked) {

            alert("ניתן למכירה בנפרד");
        }
        else {
            alert("לא ניתן למכירה בנפרד");
        }
    }

    const handleIsAloneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAloneChecked(event.target.checked);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
            setValue('images', Array.from(files));
        }
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

                    <label>images</label>
                    <input type="file" multiple onChange={handleImageChange} />
                    {errors.images && <p>{errors.images.message}</p>}
                </>
            )}

            <input type="submit" />
        </form>
    );
}

