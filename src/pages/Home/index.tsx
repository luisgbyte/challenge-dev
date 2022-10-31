import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { BoxContainer, InfoContainer, FormContainer, Button } from './styles'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import AsyncSelect from 'react-select/async'
import Select from 'react-select'

interface IForm {
  name: string
  email: string
  phone: string
  cpf: string
  country: Array<{
    label: string
    value: string
  }>
  city: Array<{
    label: string
    value: string
  }>
}

const elementSchema = zod.object({
  label: zod.string(),
  value: zod.string(),
})

const newSpotFormShema = zod.object({
  name: zod.string().min(1, 'Nome é obrigatório'),

  email: zod.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),

  phone: zod
    .number({
      required_error: 'Telefone é obrigatório',
      invalid_type_error: 'Telefone deve ser numérico',
    })
    .min(12, 'Telefone deve possuir no mínimo 10 caracteres'),

  cpf: zod
    .number({
      required_error: 'CPF é obrigatório',
      invalid_type_error: 'CPF deve ser numérico',
    })
    .min(1, 'CPF é obrigatório'),

  country: zod.array(elementSchema).nonempty({
    message: "Can't be empty!",
  }),

  city: zod.array(elementSchema).nonempty({
    message: "Can't be empty!",
  }),
})

const selectCustomStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '25rem',
    background: 'transparent',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 'none',
    border: '1.5px solid #C4C4CC',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'none',
    },
  }),
  option: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
}

export function Home() {
  const [dataForm, setDataForm] = useState<Array<IForm>>([])
  const [citiesFiltered, setCitiesFiltered] = useState<
    Array<{
      label: string
      value: string
    }>
  >([])

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(newSpotFormShema),
  })

  const selectedCountries = watch('country')

  const mapResponseToValuesAndLabels = (data: {
    name: string
    code: string
    country_code?: string
  }) => ({
    label: data.name,
    value: data.country_code ? data.country_code : data.code,
  })

  const loadOptions = async (
    option: string,
  ): Promise<
    Array<{
      label: string
      value: string
    }>
  > => {
    const response = await fetch(`https://amazon-api.sellead.com/${option}`)
      .then((response) => response.json())
      .then((response) => response.map(mapResponseToValuesAndLabels))
    return response
  }

  useEffect(() => {
    async function cityFilter() {
      const cities = await loadOptions('city')

      const filteredCities = selectedCountries?.map((country) =>
        cities?.filter((city) => (city.value === country.value ? city : null)),
      )

      return filteredCities?.flat(1)
    }

    cityFilter().then((data) => setCitiesFiltered([...data]))
  }, [selectedCountries])

  function handleCreateNewPlace(data: IForm) {
    setDataForm((dataForm) => [...dataForm, data])
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateNewPlace)}>
      <BoxContainer>
        <h3>Dados Pessoais</h3>

        <input id="name" placeholder="Name" {...register('name')} />

        <input id="email" placeholder="Email" {...register('email')} />

        <input
          id="telefone"
          placeholder="Telefone"
          {...register('phone', { valueAsNumber: true })}
        />

        <input
          id="cpf"
          placeholder="Cpf"
          {...register('cpf', { valueAsNumber: true })}
        />

        <div className="errors">
          {errors.name && <p role="alert">{errors.name?.message}</p>}
          {errors.email && <p role="alert">{errors.email?.message}</p>}
          {errors.phone && <p role="alert">{errors.phone?.message}</p>}
          {errors.cpf && <p role="alert">{errors.cpf?.message}</p>}
        </div>
      </BoxContainer>

      <BoxContainer>
        <h3>Destinos de Interesse</h3>

        <Controller
          {...register('country')}
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={() => loadOptions('country')}
              styles={selectCustomStyles}
              placeholder="Selecione o país..."
            />
          )}
        />

        <Controller
          {...register('city')}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={citiesFiltered}
              styles={selectCustomStyles}
              placeholder="Selecione a cidade..."
            />
          )}
        />

        <div className="errors">
          {errors.country && <p role="alert">{errors.country?.message}</p>}
          {errors.city && <p role="alert">{errors.city?.message}</p>}
        </div>
      </BoxContainer>

      <Button type="submit">Enviar</Button>

      {dataForm.length > 0 && (
        <InfoContainer>
          {dataForm?.map((item: IForm, index) => (
            <div key={index}>
              <h4>Dados Pessoais:</h4>
              <p>Nome: {item.name}</p>
              <p>Email: {item.email}</p>

              <div>
                <h4>Destinos de Interesse:</h4>

                <div>
                  {item.country.map((c: any) => (
                    <p key={c.value}>{c.label}</p>
                  ))}
                </div>

                <div>
                  {item.city.map((c: any) => (
                    <p key={c.label}>{c.label}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </InfoContainer>
      )}
    </FormContainer>
  )
}
