export default interface Solicitud {

    ID?: string
	Grupo?: string | number
	Solicitante?: string
	Tipo?: string
	Servicio?: string
	Categoria?: string
	Subcategoira?: string
	Otra_Categoria?: string
	Grupo_de_Soporte?: string
	Prioridad?: string
	Fecha_Pendiente?: string
	Tiempo_Remanente?: string
	Tiempo_Remanente_en_minutos?: string
	Tiempo_total_Pendiente?: string
	Tiempo_total_Pendiente_en_minutos?: string
	Acuerdo_de_Servicio?: string
	Acuerdo_de_Servicio_en_minutos?: string
	Tiempo_Primera_Respuesta?: string
	Tiempo_Primera_Respuesta_en_minutos?: string
	fecha_de_Cierre?: string
	Descripcion?: string
	Agente?: string
	Tiempo_Transcurrido?: string
	Tiempo_Transcurrido_en_minutos?: string
	Estatus?: number[] | string
	Solicitud_Padre?: string
	activos_afectado?: string
	solucion?: string
	calificacion?: string
	cuestionario?: string
	tipoFecha?: number 
}