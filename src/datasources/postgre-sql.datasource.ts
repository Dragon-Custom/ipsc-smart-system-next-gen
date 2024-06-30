import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";
import serverConfig from "../config";

const config = {
	name: "PostgreSql",
	connector: "postgresql",
	url: "",
	host: serverConfig.database.host,
	port: serverConfig.database.port,
	user: serverConfig.database.username,
	password: serverConfig.database.password,
	database: serverConfig.database.database,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class PostgreSqlDataSource
	extends juggler.DataSource
	implements LifeCycleObserver
{
	static dataSourceName = "PostgreSql";
	static readonly defaultConfig = config;

	constructor(
		@inject("datasources.config.PostgreSql", { optional: true })
		dsConfig: object = serverConfig,
	) {
		super(dsConfig);
	}
}
