import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /* add novos jobs dentro da fila (cada vez que um email for disparado,
  preciso colocar esse nvo job dentro da fila para ser processado) */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /* percorre cada um dos jobs para processar (sempre que entrar
  um job novo), o processQueue é encarregado de processar no background */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
