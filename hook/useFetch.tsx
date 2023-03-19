import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";
import { Alert } from "react-native";

const rapidAPIKey = RAPID_API_KEY;

type QueryProps = {
  [key: string]: string | number | boolean | string[] | undefined;
};

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export type JobDataProps = {
  employer_name: string;
  employer_logo: string;
  employer_website: string;
  employer_company_type: string;
  job_publisher: string;
  job_id: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string[];
  job_google_link: string;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number;
  job_required_experience: {
    no_experience_required: boolean;
    required_experience_in_months: number | string | boolean | null;
    experience_mentioned: boolean;
    experience_preferred: boolean;
  };
  job_required_skills: number | string | boolean | null;
  job_required_education: {
    postgraduate_degree: boolean;
    professional_certification: boolean;
    high_school: boolean;
    associates_degree: boolean;
    bachelors_degree: boolean;
    degree_mentioned: boolean;
    degree_preferred: boolean;
    professional_certification_mentioned: boolean;
  };
  job_experience_in_place_of_education: boolean;
  job_min_salary: number | string | boolean | null;
  job_max_salary: number | string | boolean | null;
  job_salary_currency: number | string | boolean | null;
  job_salary_period: number | string | boolean | null;
  job_highlights: {
    Qualifications: string[];
    Responsibilities: string[];
    Benefits: string[];
  };
  job_job_title: string;
};

export const useFetch = (endpoint: string, query: QueryProps) => {
  const [data, setData] = useState<JobDataProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": rapidAPIKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error: any) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setError(error.message);
        Alert.alert("Error fetching jobs", "Please try again later");
      } else {
         setError(error);
         Alert.alert("Error fetching jobs", "Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
      fetchData();
    }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, error, isLoading, refetch };
};
