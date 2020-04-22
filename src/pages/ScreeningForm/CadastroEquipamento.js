import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import equipmentTypes from "../../models/equipmentTypes";
import getCities from "../../services/cities";
import typeInstitute from "../../models/typeInstitute";
import typeStateEquipment from "../../models/typeStateEquipment";
import InputFileImage from "../_common/forms/InputFileImage";
import {sendEquipmentPhoto} from "../../modelServices/photoEquipmentService";
import {manufacturersEquipments, modelsEquipment} from "../../models/manufacturers";
import InputRadioDialog from "../_common/forms/InputRadioDialog";
import {useForm} from "react-hook-form";
import ErrorAlertText from "../_common/alerts/ErrorAlertText";

export default function CadastroEquipamento (props) {
  const cities = getCities('CE');

  const {register, errors} = useForm({mode: 'onBlur'});
  const {
    updateErrors,
    equipamento,
    serviceOrder,
    atualizarEquipamento,
    atualizarTriagem,
    updateServiceOrder
  } = props;

  const [localErrors, setLocalErrors] = React.useState({});


  function sendErrorsParent () {
    setTimeout(() => {
      const keys = Object.keys(errors);
      const errorsKeys = Object.assign({}, localErrors);

      for (let index in errorsKeys) errorsKeys[index] = false;

      for (let key of keys) {
        errorsKeys[key] = true;
      }

      setLocalErrors(errorsKeys);
      updateErrors({cadastroEquipamento: errorsKeys});
    }, 500);
  }

  function updateEquipment (event) {
    const doc = {};
    doc[event.target.name] = event.target.value.trim();
    if (event.target.name === 'marca' && equipamento.fabricante === '') {
      doc['fabricante'] = event.target.value.trim();
    }
    atualizarEquipamento(doc);
  }

  function updateScreening (event) {
    const doc = {};
    doc[event.target.name] = event.target.value.trim();
    atualizarTriagem(doc);
  }

  function updateServiceOrderParent (event) {
    const doc = {};
    doc[event.target.name] = event.target.value.trim();
    updateServiceOrder(doc);
  }

  const sendPhoto = (photo, name) => {
    sendEquipmentPhoto(photo, name, serviceOrder._id)
      .then((result) => {
        if (result) {
          updateServiceOrderParent({
            target: {
              name: '_id',
              value: result
            }
          });
          updateScreening({
            target: {
              name,
              value: result + '_' + name + '.jpeg'
            }
          });
        }
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>1. Cadastro de Equipamento</Typography>

      <Grid container>
        <Grid item xs={6}>
          <InputFileImage name={"foto_antes_limpeza"} label={"Foto antes da limpeza"} action={sendPhoto}/>
        </Grid>
      </Grid>


      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            onBlur={sendErrorsParent}
            inputRef={register({required: true})}
            onChange={updateServiceOrderParent}
            value={serviceOrder.numero_ordem_servico}
            name="numero_ordem_servico"
            label="Número da Ordem de Serviço"
            required
            fullWidth
          />
          <ErrorAlertText error={errors.numero_ordem_servico}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onBlur={sendErrorsParent}
            inputRef={register({required: true})}
            onChange={updateEquipment}
            value={equipamento.numero_de_serie}
            id="numeroDeSerie"
            name="numero_de_serie"
            label="Número de Série"
            required
            fullWidth
          />
          <ErrorAlertText error={errors.numero_de_serie}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onBlur={sendErrorsParent}
            inputRef={register({required: true})}
            onChange={updateEquipment}
            value={equipamento.nome_equipamento}
            id="nomeDoEquipamento"
            name="nome_equipamento"
            label="Nome do Equipamento"
            fullWidth
          />
          <ErrorAlertText error={errors.nome_equipamento}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={equipamento.numero_do_patrimonio}
            onChange={updateEquipment}
            name="numero_do_patrimonio"
            id="numeroDoPatrimonio"
            label="Número do Patrimônio"
            fullWidth
          />
          <ErrorAlertText error={errors.numero_do_patrimonio}/>
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Tipo do Equipamento"
            value={equipamento.tipo}
            onChange={updateEquipment}
            name={'tipo'}
            SelectProps={{native: true,}}
          >
            {equipmentTypes.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={2}>
          <InputRadioDialog
            action={updateEquipment}
            name={"marca"}
            label={"Marca"}
            hasOther={true}
            value={manufacturersEquipments[0]}
            items={manufacturersEquipments.map(item => ({label: item, value: item}))}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputRadioDialog
            action={updateEquipment}
            name={"modelo"}
            label={"Modelo"}
            hasOther={true}
            value={modelsEquipment[0]}
            items={modelsEquipment.map(item => ({label: item, value: item}))}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <TextField
            onBlur={sendErrorsParent}
            inputRef={register({required: true})}
            required
            id="fabricante"
            onChange={updateEquipment}
            value={equipamento.fabricante}
            name="fabricante"
            label="Fabricante"
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Município de Origem"
            value={equipamento.municipio_origem}
            onChange={updateEquipment}
            SelectProps={{native: true,}}
            name={'municipio_origem'}
          >
            {cities.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            onBlur={sendErrorsParent}
            inputRef={register({required: true})}
            required
            id="nome_instituicao_origem"
            onChange={updateEquipment}
            name="nome_instituicao_origem"
            label="Nome da Instituição"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            select
            label="Tipo da instituição"
            value={equipamento.tipo_instituicao_origem}
            SelectProps={{native: true,}}
            onChange={updateEquipment}
            name={'tipo_instituicao_origem'}
          >
            {typeInstitute.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </TextField>
        </Grid>


        {/*ROW*/}
        <Grid item xs={6} sm={4}>
          <TextField
            onBlur={sendErrorsParent}
            inputRef={register({required: true})}
            required
            id="nomeDoResponsavel"
            onChange={updateEquipment}
            value={equipamento.nome_responsavel}
            name="nome_responsavel"
            label="Nome do Responsável"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="constatoDoResponsavel"
            onChange={updateEquipment}
            value={equipamento.contato_responsavel}
            name="contato_responsavel"
            label="Contato do Responsável"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            fullWidth
            select
            label="Estado de Conservação"
            value={serviceOrder.triagem.estado_de_conservacao}
            onChange={updateScreening}
            name={'estado_de_conservacao'}
            SelectProps={{native: true,}}
          >
            {typeStateEquipment.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6}>
          <InputFileImage name={"foto_apos_limpeza"} label={"Foto após da limpeza"} action={sendPhoto}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
