import { z } from "zod";
export const registerSchema = z.object({// esquema de la ruta para registrar
  userName: z.string({// establecemos el tipo de dato
    required_error: " Username is required", // mensaje si hay un error en el atributo
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),// especificamos que es un string y que cumpla las carcteristicas de un email
  password: z
    .string({ required_error: " Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }), // string de longitud min de 6 caracteres
});

export const loginSchema = z.object({// esquema de la ruta para loguear
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: " Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
