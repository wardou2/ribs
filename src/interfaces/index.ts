export interface Patient {
    id: number;
    firstname: string;
    lastname: string;
    sex_at_birth: string;
    birthdate: number;
    height: number;
    created_by_user_id: number;
    created_datetime: number;
    number_of_sessions: number;
    type_tag: string;
    email_address: string;
    street_address: string;
    city: string;
    state: string;
    zipcode: string;
    phone_number: string;
    gender_identity: string;
    clinical_ref: string;
    patientgroups: string;
}

export type AuthLevel = "Administrator" | "Clinician" | "";

export interface Role {
    id: number;
    name: AuthLevel;
    created_datetime: number;
    permissions?: string[];
    description?: string | null;
    created_by_user_id?: number;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    created_datetime: number;
    created_by_user_id: number;
    email: string;
    password: string;
    roles: Role[];
    permissions: string[];
}

export interface LocationState {
    from: {
        pathname: string;
    };
}
