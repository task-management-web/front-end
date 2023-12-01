import React from "react";
import styles from "./SignUp.module.css";
import TextField from "../base/TextField/TextField";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Link } from "react-router-dom";

const SignUpSchema = yup.object().shape({
	fullName: yup.string().required("Bạn chưa nhập họ tên"),
	userName: yup
		.string()
		.required("Bạn chưa nhập tên đăng nhập")
		.matches(/^(\w|_)*$/, "Tên đăng nhập chỉ chứa chữ cái, chữ số và kí tự _"),
	email: yup
		.string()
		.email("Email không hợp lệ")
		.required("Bạn chưa nhập email"),
	password: yup
		.string()
		.required("Bạn chưa nhập mật khẩu")
		.min(8, "Độ dài tối thiểu của mật khẩu là 8")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			"Chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
		),
	confirmPassword: yup
		.string()
		.required("Bạn chưa xác nhận mật khẩu")
		.min(8, "Độ dài tối thiểu của mật khẩu là 8")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			"Chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
		),
});

export const SignUp = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SignUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
		},
	});

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<div className='sign-up-text'>
					<h2>Đăng ký</h2>
					<span>Hãy điền thông tin của bạn để tạo tài khoản mới</span>
				</div>
				<form className={styles.formContainer}>
					<Controller
						control={control}
						name='fullName'
						render={({ field }) => (
							<TextField
								label='Họ tên'
								className={"lg:col-span-2"}
								required={true}
								helperText={errors.fullName?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
							/>
						)}
					/>
					<Controller
						control={control}
						name='userName'
						render={({ field }) => (
							<TextField
								label='Tên đăng nhập'
								required={true}
								helperText={errors.userName?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
							/>
						)}
					/>
					<Controller
						control={control}
						name='email'
						render={({ field }) => (
							<TextField
								label='Email'
								required={true}
								helperText={errors.email?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
							/>
						)}
					/>
					<Controller
						control={control}
						name='password'
						render={({ field }) => (
							<TextField
								label='Mật khẩu'
								required={true}
								helperText={errors.password?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
								type='password'
							/>
						)}
					/>
					<Controller
						control={control}
						name='confirmPassword'
						render={({ field }) => (
							<TextField
								label='Xác nhận mật khẩu'
								required={true}
								helperText={errors.confỉmPassword?.message}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								labelStyle={{ fontSize: "small" }}
								type='password'
							/>
						)}
					/>
					<div className={styles.buttonRow}>
						<button
							className={clsx(styles.submitButton, "fill-button")}
							onClick={handleSubmit(onSubmit)}
						>
							ĐĂNG KÝ
						</button>
						<div className={styles.signinText}>
							Đã có tài khoản?{" "}
							<Link to={"/sign-in"} className='link-text'>
								Đăng nhập
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
