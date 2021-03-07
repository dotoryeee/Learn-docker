FROM centos:7 
COPY ["Percona-Server-client-57-5.7.33-36.1.el7.x86_64.rpm",\
      "Percona-Server-server-57-5.7.33-36.1.el7.x86_64.rpm", \
      "Percona-Server-shared-57-5.7.33-36.1.el7.x86_64.rpm", \
      "Percona-Server-shared-compat-57-5.7.33-36.1.el7.x86_64.rpm", \
      "mysqld_exporter-0.12.1.linux-amd64.tar.gz", \
      "node_exporter-1.1.1.linux-amd64.tar.gz", \
      "start_node_exporter.sh", \
      "start_mysqld_exporter.sh", \
      ".my.cnf","/tmp/"]
USER root
RUN groupadd -g 1001 mysql
RUN useradd -u 1001 -r -g 1001 mysql
RUN yum install -y perl.x86_64 \
    libaio.x86_64 \
    numactl-libs.x86_64 \
    net-tools.x86_64 \
    sudo.x86_64 \
    openssl.x86_64
WORKDIR /tmp/
RUN rpm -ivh Percona-Server-shared-57-5.7.33-36.1.el7.x86_64.rpm \
    Percona-Server-shared-compat-57-5.7.33-36.1.el7.x86_64.rpm \
    Percona-Server-client-57-5.7.33-36.1.el7.x86_64.rpm \
    Percona-Server-server-57-5.7.33-36.1.el7.x86_64.rpm
RUN mkdir -p /opt/exporters/ && \
    tar -xzvf ./node_exporter-1.1.1.linux-amd64.tar.gz -C /opt/exporters && \
    tar -xzvf ./mysqld_exporter-0.12.1.linux-amd64.tar.gz -C /opt/exporters
WORKDIR /opt/exporters/
RUN mv node_exporter-1.1.1.linux-amd64 node_exporter && \
    mv mysqld_exporter-0.12.1.linux-amd64 mysqld_exporter && \
    mv /tmp/start_node_exporter.sh /opt/exporters/node_exporter/ && \
    mv /tmp/start_mysqld_exporter.sh /opt/exporters/mysqld_exporter/ && \
    mv /tmp/.my.cnf /opt/exporters/mysqld_exporter/ && \
    chmod o+x /opt/exporters/node_exporter/start_node_exporter.sh && \
    chmod o+x /opt/exporters/mysqld_exporter/start_mysqld_exporter.sh && \
    rm -rf /tmp/*.rpm && \
    /usr/bin/install -m 0775 -o mysql -g mysql -d /var/lib/mysql \
    /var/run/mysqld /docker-entrypoint-initdb.d
VOLUME ["/var/lib/mysql", "/var/log/mysql","/etc/percona-server.conf.d"]
COPY ps-entry.sh /tmp/docker-entrypoint.sh
RUN chmod +x /tmp/docker-entrypoint.sh
ENTRYPOINT ["/tmp/docker-entrypoint.sh"]
USER mysql
EXPOSE 3306
CMD ["mysqld"]
