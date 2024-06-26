import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import { addProduct } from "../features/product/productSlice";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { addItem } from '../Api-Requests/genericRequests';


interface IFormInput {
    id: string,
    Name: string,
    Description: string,
    Price: number,
    Pictures: FileList | null;
}

const AddProductForm = () => {
    const dispatch = useDispatch();
    const notSaleAloneSchema = yup.object().shape({
        Name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
        Price: yup.number().required("purchase price is a required field").positive("price must be positive"),
    });

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm<IProduct>({ resolver: yupResolver(notSaleAloneSchema) });

    const navigate = useNavigate();
    const productState = useSelector((state: any) => state.product);
    const productComponents = productState.data.map((product: IProduct) => product.productComponents);
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

    const sumArrComponent = () => {
        let sum = 0;
        productComponents.forEach((component: IComponent) => {
            sum += component.componentBuyPrice;
        });
        return sum;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = event.target.files;
            if (files.length > 4) {
                console.error('Maximum of 4 images allowed.');
                return;
            }
            setSelectedImages(files);
        }
    };

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!selectedImages || selectedImages.length < 1 || selectedImages.length > 4) {
            console.error('Please select between 1 and 4 images.');
            return;
        }
        try {
            dispatch(addProduct(data));
            await addItem<IComponent>('component',data);

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Name of Product"
                    variant="outlined"
                    {...register("Name", { required: true, maxLength: 20 })}
                    error={!!errors.Name}
                    helperText={errors.Name ? errors.Name.message : ''}
                />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Description of Product"
                    variant="outlined"
                    {...register("Description", { required: true })}
                    error={!!errors.Description}
                    helperText={errors.Description ? errors.Description.message : ''}
                />
            </div>
            <br />
            <button onClick={() => navigate('/')}>select components</button>
            <div>{sumArrComponent()}</div>
            <br />
            <input
                type="file"
                accept="image/*"
                multiple
                {...register('Pictures', { required: true, validate: files => files && files.length >= 1 && files.length <= 4 })}
                onChange={handleImageChange}
            />
            {errors.Pictures && <p>{errors.Pictures.message}</p>}
            <br />
            <label>Price</label><br />
            <input
                type="number"
                {...register("Price", { required: true, min: 0.01 })}
                error={!!errors.Price}
                helperText={errors.Price ? errors.Price.message : ''}
            />
            <br />
            <input type="submit" />
        </form>
    );
}

export default AddProductForm;
