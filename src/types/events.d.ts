declare namespace Revite {

  type Event = import('../core/Event').Event
  type Listener = import('../core/Listener').Listener

  namespace Events {

    type EventConstructor = Revite.Constructor<Revite.Event, any>
    type ListenerConstructor = Revite.Constructor<Revite.Listener, void>
  }
}
